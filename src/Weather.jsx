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
              'url("data:image/jpeg;base64,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")',
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
              'url("data:image/jpeg;base64,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")',
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
        case "Mist":
          return {
            backgroundImage:
              'url("https://images.pexels.com/photos/1287075/pexels-photo-1287075.jpeg?cs=srgb&dl=pexels-eberhardgross-1287075.jpg&fm=jpg")',
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
            <Typography variant="body1" component="div" gutterBottom>
              Enter a city name to get the current weather
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
