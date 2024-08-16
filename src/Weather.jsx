import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Container,
  Typography,
  Box,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

// API configuration
const api = {
  key: "b6f103982e12db32f5f78f6e45ff00f7",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [showSearchBar, setShowSearchBar] = useState(true);

  const search = () => {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        setShowSearchBar(false);
      });
  };

  const handleReenter = () => {
    setWeather({});
    setShowSearchBar(true);
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  // Function to determine background style based on weather condition
  const getBackgroundStyle = () => {
    if (typeof weather.weather !== "undefined") {
      switch (weather.weather[0].main) {
        case "Clear":
          return {
            backgroundImage:
              'url("https://wallpapers.com/images/hd/sunny-weather-with-cherry-blossom-fr2tn0f21evp0viw.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          };
        case "Clouds":
          return {
            backgroundImage:
              'url("https://images.unsplash.com/photo-1467601558372-f99aeb150ad5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          };
        case "Rain":
          return {
            backgroundImage:
              'url("https://images.alphacoders.com/159/159471.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          };
        case "Snow":
          return {
            backgroundImage:
              'url("data:image/jpeg;base64,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")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          };

        case "Haze":
          return {
            backgroundImage:
              'url("https://media.istockphoto.com/id/172432772/photo/hazy-morning-atmosphere-in-bangkok.jpg?s=612x612&w=0&k=20&c=oh400c79LC_KHGNkcOHmOxJYBYgAgqhm4TsQhKZer48=")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          };
        case "Mist":
          return {
            backgroundImage:
              'url("https://c1.wallpaperflare.com/preview/300/812/964/conifers-dark-fir-trees-fog.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          };
        case "Thunderstorm":
          return {
            backgroundImage:
              'url("data:image/jpeg;base64,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")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          };
        default:
          return { backgroundColor: "#b0bec5" }; // Default background color
      }
    }
    return { backgroundColor: "#b0bec5" }; // Default background color
  };

  return (
    <div style={{ height: "100vh", width: "100vw", ...getBackgroundStyle() }}>
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            padding: "20px",
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <Box sx={{ my: 4 }}>
            <Typography variant="h2" component="div" gutterBottom>
              Weather App
            </Typography>
          </Box>

          {showSearchBar ? (
            <Grid
              container
              spacing={3}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <TextField
                  label="Enter City"
                  variant="outlined"
                  fullWidth
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={search}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          ) : (
            <>
              {typeof weather.main != "undefined" ? (
                <Box sx={{ my: 4 }}>
                  <Typography variant="h3" component="div" gutterBottom>
                    {weather.name}, {weather.sys?.country}
                  </Typography>
                  <Typography variant="h4" component="div">
                    {dateBuilder(new Date())}
                  </Typography>
                  <Typography variant="h1" component="div" gutterBottom>
                    {Math.round(weather.main.temp)}°C
                  </Typography>
                  <Typography variant="h5" component="div" gutterBottom>
                    {weather.weather[0].main}
                  </Typography>
                  <Box sx={{ my: 4 }}>
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                      alt={weather.weather[0].description}
                      style={{ width: "120px", height: "120px" }}
                    />
                  </Box>
                </Box>
              ) : null}
              <Typography variant="body1" component="div" gutterBottom>
                Enter a city name to get the current weather
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleReenter}
              >
                Re-enter City
              </Button>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Weather;
