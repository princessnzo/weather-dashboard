import React from "react";
import {
  Typography,
  Paper,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import {
  ExpandMore,
  ChevronRight,
  LocationOn,
  Today,
  Timeline,
  Thermostat,
  Air,
  Water,
  Cloud,
  Schedule,
  Height,
  Language,
} from "@mui/icons-material";
import { TreeView, TreeItem } from "@mui/lab"; // Fixed import
import { WeatherData } from "../types/weather";

interface WeatherTreeProps {
  data: WeatherData;
}

const WeatherTree: React.FC<WeatherTreeProps> = ({ data }) => {
  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Thermostat sx={{ color: "#ff9800" }} />;
    if (code <= 3) return <Cloud sx={{ color: "#90a4ae" }} />;
    return <Water sx={{ color: "#29b6f6" }} />;
  };

  const getWeatherDescription = (code: number) => {
    const descriptions: { [key: number]: string } = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
    };
    return descriptions[code] || "Unknown weather";
  };

  return (
    <Paper sx={{ p: 3, backgroundColor: "white", height: "100%" }}>
      <Typography variant="h5" sx={{ color: "#1565c0", mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
        <ChevronRight /> Weather Data Tree View
      </Typography>

      <TreeView
        defaultCollapseIcon={<ExpandMore sx={{ color: "#1976d2" }} />}
        defaultExpandIcon={<ChevronRight sx={{ color: "#1976d2" }} />}
        defaultExpanded={["1", "6", "12"]}
        sx={{ flexGrow: 1, maxWidth: "100%" }}
      >
        {/* Location Information */}
        <TreeItem
          nodeId="1"
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, py: 1 }}>
              <LocationOn sx={{ color: "#1976d2" }} />
              <Typography sx={{ color: "#0d47a1", fontWeight: 600 }}>
                Location Information
              </Typography>
            </Box>
          }
          sx={{
            "& .MuiTreeItem-content": {
              py: 1,
              borderBottom: "1px solid #e3f2fd",
            },
          }}
        >
          <TreeItem
            nodeId="2"
            label={
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Language sx={{ color: "#1976d2", fontSize: 18 }} />
                  <Typography sx={{ color: "#1976d2" }}>Latitude</Typography>
                </Box>
                <Chip 
                  label={data.latitude} 
                  size="small" 
                  sx={{ backgroundColor: "#bbdefb", color: "#1565c0", fontWeight: 500 }}
                />
              </Box>
            }
          />
          <TreeItem
            nodeId="3"
            label={
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Language sx={{ color: "#1976d2", fontSize: 18 }} />
                  <Typography sx={{ color: "#1976d2" }}>Longitude</Typography>
                </Box>
                <Chip 
                  label={data.longitude} 
                  size="small" 
                  sx={{ backgroundColor: "#bbdefb", color: "#1565c0", fontWeight: 500 }}
                />
              </Box>
            }
          />
          <TreeItem
            nodeId="4"
            label={
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <Typography sx={{ color: "#1976d2" }}>Timezone</Typography>
                <Chip 
                  label={data.timezone} 
                  size="small" 
                  sx={{ backgroundColor: "#bbdefb", color: "#1565c0", fontWeight: 500 }}
                />
              </Box>
            }
          />
          <TreeItem
            nodeId="5"
            label={
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Height sx={{ color: "#1976d2", fontSize: 18 }} />
                  <Typography sx={{ color: "#1976d2" }}>Elevation</Typography>
                </Box>
                <Chip 
                  label={`${data.elevation}m`} 
                  size="small" 
                  sx={{ backgroundColor: "#bbdefb", color: "#1565c0", fontWeight: 500 }}
                />
              </Box>
            }
          />
        </TreeItem>

        {/* Current Weather */}
        <TreeItem
          nodeId="6"
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, py: 1 }}>
              <Today sx={{ color: "#1976d2" }} />
              <Typography sx={{ color: "#0d47a1", fontWeight: 600 }}>
                Current Weather Measurements
              </Typography>
            </Box>
          }
          sx={{
            "& .MuiTreeItem-content": {
              py: 1,
              borderBottom: "1px solid #e3f2fd",
            },
          }}
        >
          <TreeItem
            nodeId="7"
            label={
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Thermostat sx={{ color: "#f44336", fontSize: 20 }} />
                  <Typography sx={{ color: "#1976d2" }}>Temperature</Typography>
                </Box>
                <Chip 
                  label={`${data.current_weather.temperature}°C`} 
                  size="small" 
                  sx={{ backgroundColor: "#ffebee", color: "#c62828", fontWeight: 600 }}
                />
              </Box>
            }
          />
          <TreeItem
            nodeId="8"
            label={
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Air sx={{ color: "#2196f3", fontSize: 20 }} />
                  <Typography sx={{ color: "#1976d2" }}>Wind Speed</Typography>
                </Box>
                <Chip 
                  label={`${data.current_weather.windspeed} km/h`} 
                  size="small" 
                  sx={{ backgroundColor: "#e3f2fd", color: "#1565c0", fontWeight: 600 }}
                />
              </Box>
            }
          />
          <TreeItem
            nodeId="9"
            label={
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Water sx={{ color: "#29b6f6", fontSize: 20 }} />
                  <Typography sx={{ color: "#1976d2" }}>Wind Direction</Typography>
                </Box>
                <Chip 
                  label={`${data.current_weather.winddirection}°`} 
                  size="small" 
                  sx={{ backgroundColor: "#e3f2fd", color: "#1565c0", fontWeight: 600 }}
                />
              </Box>
            }
          />
          <TreeItem
            nodeId="10"
            label={
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {getWeatherIcon(data.current_weather.weathercode)}
                  <Typography sx={{ color: "#1976d2" }}>Weather Code</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip 
                    label={data.current_weather.weathercode} 
                    size="small" 
                    sx={{ backgroundColor: "#e8f5e9", color: "#2e7d32", fontWeight: 600 }}
                  />
                  <Typography variant="caption" sx={{ color: "#64b5f6" }}>
                    {getWeatherDescription(data.current_weather.weathercode)}
                  </Typography>
                </Box>
              </Box>
            }
          />
          <TreeItem
            nodeId="11"
            label={
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Schedule sx={{ color: "#1976d2", fontSize: 20 }} />
                  <Typography sx={{ color: "#1976d2" }}>Measurement Time</Typography>
                </Box>
                <Typography sx={{ color: "#1976d2", fontWeight: 500, fontSize: "0.9rem" }}>
                  {new Date(data.current_weather.time).toLocaleString()}
                </Typography>
              </Box>
            }
          />
        </TreeItem>

        {/* Technical Details */}
        <TreeItem
          nodeId="12"
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, py: 1 }}>
              <Timeline sx={{ color: "#1976d2" }} />
              <Typography sx={{ color: "#0d47a1", fontWeight: 600 }}>
                Technical Metadata
              </Typography>
            </Box>
          }
          sx={{
            "& .MuiTreeItem-content": {
              py: 1,
            },
          }}
        >
          <TreeItem
            nodeId="13"
            label={
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <Typography sx={{ color: "#1976d2" }}>Generation Time</Typography>
                <Chip 
                  label={`${data.generationtime_ms}ms`} 
                  size="small" 
                  sx={{ backgroundColor: "#f5f5f5", color: "#1976d2", fontWeight: 500 }}
                />
              </Box>
            }
          />
          <TreeItem
            nodeId="14"
            label={
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <Typography sx={{ color: "#1976d2" }}>UTC Offset</Typography>
                <Chip 
                  label={`${data.utc_offset_seconds} seconds`} 
                  size="small" 
                  sx={{ backgroundColor: "#f5f5f5", color: "#1976d2", fontWeight: 500 }}
                />
              </Box>
            }
          />
          <TreeItem
            nodeId="15"
            label={
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <Typography sx={{ color: "#1976d2" }}>Timezone Abbreviation</Typography>
                <Chip 
                  label={data.timezone_abbreviation} 
                  size="small" 
                  sx={{ backgroundColor: "#f5f5f5", color: "#1976d2", fontWeight: 500 }}
                />
              </Box>
            }
          />
        </TreeItem>
      </TreeView>

      <Divider sx={{ my: 3, borderColor: "#e3f2fd" }} />

      {/* Summary Box */}
      <Paper sx={{ p: 2, backgroundColor: "#e3f2fd", borderRadius: 2 }}>
        <Typography variant="subtitle2" sx={{ color: "#1565c0", mb: 1 }}>
          📋 Data Summary
        </Typography>
        <Typography variant="body2" sx={{ color: "#1976d2" }}>
          • Location: {data.latitude}, {data.longitude}
        </Typography>
        <Typography variant="body2" sx={{ color: "#1976d2" }}>
          • Current Temperature: {data.current_weather.temperature}°C
        </Typography>
        <Typography variant="body2" sx={{ color: "#1976d2" }}>
          • Wind Conditions: {data.current_weather.windspeed} km/h at {data.current_weather.winddirection}°
        </Typography>
        <Typography variant="body2" sx={{ color: "#1976d2" }}>
          • Last Updated: {new Date(data.current_weather.time).toLocaleTimeString()}
        </Typography>
      </Paper>
    </Paper>
  );
};

export default WeatherTree;
