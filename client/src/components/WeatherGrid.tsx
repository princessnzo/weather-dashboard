import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Paper,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Thermostat,
  Air,
  Water,
  Speed,
  WbSunny,
  Cloud,
  LocationOn,
  Schedule,
} from "@mui/icons-material";
import { WeatherData } from "../types/weather";

interface WeatherGridProps {
  data: WeatherData;
}

const WeatherGrid: React.FC<WeatherGridProps> = ({ data }) => {
  const getWeatherIcon = (code: number) => {
    if (code === 0) return <WbSunny sx={{ color: "#ff9800", fontSize: 40 }} />;
    if (code <= 3) return <Cloud sx={{ color: "#90a4ae", fontSize: 40 }} />;
    return <Water sx={{ color: "#29b6f6", fontSize: 40 }} />;
  };

  const getWeatherDescription = (code: number) => {
    const descriptions: { [key: number]: string } = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Foggy",
      48: "Depositing rime fog",
    };
    return descriptions[code] || `Weather code: ${code}`;
  };

  const weatherCards = [
    {
      title: "Temperature",
      value: `${data.current_weather.temperature}°C`,
      icon: <Thermostat sx={{ color: "#f44336", fontSize: 40 }} />,
      color: "#ffebee",
      textColor: "#c62828",
    },
    {
      title: "Wind Speed",
      value: `${data.current_weather.windspeed} km/h`,
      icon: <Air sx={{ color: "#2196f3", fontSize: 40 }} />,
      color: "#e3f2fd",
      textColor: "#1565c0",
    },
    {
      title: "Wind Direction",
      value: `${data.current_weather.winddirection}°`,
      icon: <Speed sx={{ color: "#9c27b0", fontSize: 40 }} />,
      color: "#f3e5f5",
      textColor: "#6a1b9a",
    },
    {
      title: "Weather",
      value: getWeatherDescription(data.current_weather.weathercode),
      icon: getWeatherIcon(data.current_weather.weathercode),
      color: "#e8f5e9",
      textColor: "#2e7d32",
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      {/* Weather Cards */}
      <Typography variant="h5" sx={{ color: "#1565c0", mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
        <Thermostat /> Current Weather
      </Typography>
      
      <Box sx={{ 
        display: "grid", 
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
        gap: 3, 
        mb: 4 
      }}>
        {weatherCards.map((card, index) => (
          <Card
            key={index}
            sx={{
              backgroundColor: card.color,
              border: "2px solid transparent",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "#bbdefb",
                transform: "translateY(-4px)",
                boxShadow: "0 8px 16px rgba(33, 150, 243, 0.2)",
              },
            }}
          >
            <CardContent sx={{ textAlign: "center", p: 3 }}>
              <Box sx={{ mb: 2 }}>{card.icon}</Box>
              <Typography variant="h4" sx={{ color: card.textColor, mb: 1, fontWeight: 600 }}>
                {card.value}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#1976d2", fontWeight: 500 }}>
                {card.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Location Information */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: "#e3f2fd",
          borderRadius: 3,
          border: "1px solid #bbdefb",
        }}
      >
        <Typography variant="h6" sx={{ color: "#1565c0", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <LocationOn /> Location Details
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
          <Chip
            label={`Latitude: ${data.latitude}`}
            sx={{ backgroundColor: "#bbdefb", color: "#1565c0" }}
          />
          <Chip
            label={`Longitude: ${data.longitude}`}
            sx={{ backgroundColor: "#bbdefb", color: "#1565c0" }}
          />
          <Chip
            label={`Timezone: ${data.timezone}`}
            sx={{ backgroundColor: "#bbdefb", color: "#1565c0" }}
          />
          <Chip
            label={`Elevation: ${data.elevation}m`}
            sx={{ backgroundColor: "#bbdefb", color: "#1565c0" }}
          />
        </Box>
        <Typography variant="body2" sx={{ color: "#1976d2", fontStyle: "italic", display: "flex", alignItems: "center", gap: 1 }}>
          <Schedule /> Last updated: {new Date(data.current_weather.time).toLocaleString()}
        </Typography>
      </Paper>

      {/* Weather Details Table */}
      <Typography variant="h5" sx={{ color: "#1565c0", mb: 3 }}>
        Weather Details
      </Typography>
      <TableContainer 
        component={Paper}
        sx={{
          borderRadius: 3,
          border: "1px solid #e3f2fd",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f9ff" }}>
            <TableRow>
              <TableCell sx={{ color: "#1565c0", fontWeight: 600 }}>Parameter</TableCell>
              <TableCell sx={{ color: "#1565c0", fontWeight: 600 }}>Value</TableCell>
              <TableCell sx={{ color: "#1565c0", fontWeight: 600 }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ "&:nth-of-type(even)": { backgroundColor: "#fafdff" } }}>
              <TableCell sx={{ color: "#1976d2", fontWeight: 500 }}>Temperature</TableCell>
              <TableCell sx={{ color: "#c62828", fontWeight: 600 }}>{data.current_weather.temperature}°C</TableCell>
              <TableCell sx={{ color: "#1976d2" }}>Current air temperature</TableCell>
            </TableRow>
            <TableRow sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafdff" } }}>
              <TableCell sx={{ color: "#1976d2", fontWeight: 500 }}>Wind Speed</TableCell>
              <TableCell sx={{ color: "#1565c0", fontWeight: 600 }}>{data.current_weather.windspeed} km/h</TableCell>
              <TableCell sx={{ color: "#1976d2" }}>Wind speed at 10m height</TableCell>
            </TableRow>
            <TableRow sx={{ "&:nth-of-type(even)": { backgroundColor: "#fafdff" } }}>
              <TableCell sx={{ color: "#1976d2", fontWeight: 500 }}>Wind Direction</TableCell>
              <TableCell sx={{ color: "#6a1b9a", fontWeight: 600 }}>{data.current_weather.winddirection}°</TableCell>
              <TableCell sx={{ color: "#1976d2" }}>Wind direction in degrees</TableCell>
            </TableRow>
            <TableRow sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafdff" } }}>
              <TableCell sx={{ color: "#1976d2", fontWeight: 500 }}>Weather Code</TableCell>
              <TableCell sx={{ color: "#2e7d32", fontWeight: 600 }}>{data.current_weather.weathercode}</TableCell>
              <TableCell sx={{ color: "#1976d2" }}>{getWeatherDescription(data.current_weather.weathercode)}</TableCell>
            </TableRow>
            <TableRow sx={{ "&:nth-of-type(even)": { backgroundColor: "#fafdff" } }}>
              <TableCell sx={{ color: "#1976d2", fontWeight: 500 }}>Generation Time</TableCell>
              <TableCell sx={{ color: "#1976d2", fontWeight: 600 }}>{data.generationtime_ms}ms</TableCell>
              <TableCell sx={{ color: "#1976d2" }}>API processing time</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Additional Info */}
      <Box sx={{ 
        mt: 4, 
        display: "grid", 
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, 
        gap: 3 
      }}>
        <Paper sx={{ p: 3, backgroundColor: "#f8fbff" }}>
          <Typography variant="h6" sx={{ color: "#1565c0", mb: 2 }}>
            📡 Data Source
          </Typography>
          <Typography sx={{ color: "#1976d2", mb: 1 }}>
            • API: Open-Meteo
          </Typography>
          <Typography sx={{ color: "#1976d2", mb: 1 }}>
            • Timezone: {data.timezone_abbreviation}
          </Typography>
          <Typography sx={{ color: "#1976d2" }}>
            • UTC Offset: {data.utc_offset_seconds} seconds
          </Typography>
        </Paper>
        
        <Paper sx={{ p: 3, backgroundColor: "#f8fbff" }}>
          <Typography variant="h6" sx={{ color: "#1565c0", mb: 2 }}>
            🕐 Time Information
          </Typography>
          <Typography sx={{ color: "#1976d2", mb: 1 }}>
            • Local Time: {new Date(data.current_weather.time).toLocaleTimeString()}
          </Typography>
          <Typography sx={{ color: "#1976d2", mb: 1 }}>
            • Date: {new Date(data.current_weather.time).toLocaleDateString()}
          </Typography>
          <Typography sx={{ color: "#1976d2" }}>
            • Timezone: {data.timezone.replace("_", " ")}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default WeatherGrid;
