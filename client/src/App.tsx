import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { 
  Container, 
  Typography, 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  CircularProgress,
  Alert,
  Paper,
  Tabs,
  Tab
} from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import RefreshIcon from "@mui/icons-material/Refresh";
import GridViewIcon from "@mui/icons-material/GridView";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import blueTheme from "./theme";
import { WeatherData } from "./types/weather";
import IoTSimulation from "./components/IoTSimulation";
import WeatherGrid from "./components/WeatherGrid";
import WeatherTree from "./components/WeatherTree";
import LocationSelector from "./components/LocationSelector";

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [location, setLocation] = useState({ latitude: 25.75, longitude: 28.19 });

  const fetchWeatherData = async (lat?: number, lon?: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const latToUse = lat || location.latitude;
      const lonToUse = lon || location.longitude;
      
      const response = await fetch(
        `http://localhost:5001/api/weather?latitude=${latToUse}&longitude=${lonToUse}`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");
      
      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLocationChange = (newLocation: { latitude: number; longitude: number }) => {
    setLocation(newLocation);
    fetchWeatherData(newLocation.latitude, newLocation.longitude);
  };

  return (
    <ThemeProvider theme={blueTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f5f9ff" }}>
        {/* Header */}
        <AppBar position="static" elevation={1}>
          <Toolbar>
            <CloudIcon sx={{ mr: 2, fontSize: 30 }} />
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
              Weather Dashboard
            </Typography>
            <Button 
              variant="contained" 
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <RefreshIcon />}
              onClick={() => fetchWeatherData()}
              disabled={loading}
              sx={{
                background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                "&:hover": {
                  background: "linear-gradient(135deg, #1565c0 0%, #2196f3 100%)",
                },
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              {loading ? "Loading..." : "Refresh Data"}
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ flex: 1, py: 3 }}>
          {/* Error Alert */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: "8px",
                border: "1px solid #ffcdd2",
              }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          {/* Main Content - Using Box instead of Grid */}
          <Box sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", lg: "row" }, 
            gap: 3 
          }}>
            {/* Left Column - IoT & Location */}
            <Box sx={{ 
              width: { xs: "100%", lg: "35%" },
              display: "flex",
              flexDirection: "column",
              gap: 3
            }}>
              <IoTSimulation />
              <LocationSelector 
                onLocationChange={handleLocationChange}
                currentLocation={location}
              />
            </Box>

            {/* Right Column - Weather Data */}
            <Box sx={{ 
              width: { xs: "100%", lg: "65%" }
            }}>
              <Paper sx={{ 
                p: 3, 
                height: "100%", 
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(33, 150, 243, 0.08)",
              }}>
                {/* Tabs */}
                <Tabs 
                  value={tabValue} 
                  onChange={handleTabChange} 
                  sx={{ 
                    mb: 3,
                    "& .MuiTab-root": {
                      color: "#1976d2",
                      textTransform: "none",
                      fontWeight: 500,
                      fontSize: "1rem",
                      "&.Mui-selected": {
                        color: "#1565c0",
                        fontWeight: 600,
                      },
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#1976d2",
                      height: 3,
                      borderRadius: "2px",
                    },
                  }}
                >
                  <Tab 
                    icon={<GridViewIcon />} 
                    iconPosition="start" 
                    label="Grid View" 
                  />
                  <Tab 
                    icon={<AccountTreeIcon />} 
                    iconPosition="start" 
                    label="Tree View" 
                  />
                </Tabs>

                {/* Weather Content */}
                {weatherData ? (
                  <Box sx={{ maxHeight: "600px", overflowY: "auto", pr: 1 }}>
                    {tabValue === 0 ? (
                      <WeatherGrid data={weatherData} />
                    ) : (
                      <WeatherTree data={weatherData} />
                    )}
                  </Box>
                ) : (
                  <Box sx={{ textAlign: "center", py: 8 }}>
                    <CircularProgress sx={{ color: "#1976d2", mb: 3 }} size={60} />
                    <Typography variant="h6" sx={{ color: "#1976d2", mb: 1 }}>
                      Loading Weather Data
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64b5f6" }}>
                      Fetching latest weather information from Open-Meteo API...
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Box>
          </Box>
        </Container>

        {/* Footer */}
        <Box sx={{ 
          p: 3, 
          backgroundColor: "#e3f2fd", 
          mt: 4,
          borderTop: "1px solid #bbdefb",
        }}>
          <Typography variant="body2" align="center" sx={{ color: "#1976d2" }}>
            🌤️ Weather Dashboard © {new Date().getFullYear()} | 
            Using Open-Meteo API | 
            IoT Simulation with MQTT & WebSocket | 
            Modern Blue/White Theme
          </Typography>
          <Typography variant="caption" align="center" sx={{ color: "#64b5f6", display: "block", mt: 1 }}>
            Demonstrates: React, TypeScript, Material-UI, REST API, WebSocket, MQTT, Docker
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
