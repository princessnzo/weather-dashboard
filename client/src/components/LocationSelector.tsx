import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { LocationOn, MyLocation, Search } from "@mui/icons-material";

interface LocationSelectorProps {
  onLocationChange: (location: { latitude: number; longitude: number }) => void;
  currentLocation: { latitude: number; longitude: number };
}

const predefinedLocations = [
  { name: "New York, USA", lat: 40.7128, lon: -74.0060 },
  { name: "London, UK", lat: 51.5074, lon: -0.1278 },
  { name: "Tokyo, Japan", lat: 35.6762, lon: 139.6503 },
  { name: "Sydney, Australia", lat: -33.8688, lon: 151.2093 },
  { name: "Cairo, Egypt", lat: 30.0444, lon: 31.2357 },
  { name: "Default Location", lat: 25.75, lon: 28.19 },
];

const LocationSelector: React.FC<LocationSelectorProps> = ({
  onLocationChange,
  currentLocation,
}) => {
  const [latitude, setLatitude] = useState<string>(currentLocation.latitude.toString());
  const [longitude, setLongitude] = useState<string>(currentLocation.longitude.toString());
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || lat < -90 || lat > 90) {
      setError("Latitude must be between -90 and 90");
      return;
    }
    if (isNaN(lon) || lon < -180 || lon > 180) {
      setError("Longitude must be between -180 and 180");
      return;
    }

    setError("");
    onLocationChange({ latitude: lat, longitude: lon });
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLatitude(lat.toString());
          setLongitude(lon.toString());
          onLocationChange({ latitude: lat, longitude: lon });
        },
        () => {
          setError("Unable to retrieve your location");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  };

  const handlePredefinedLocation = (lat: number, lon: number) => {
    setLatitude(lat.toString());
    setLongitude(lon.toString());
    onLocationChange({ latitude: lat, longitude: lon });
  };

  return (
    <Paper sx={{ p: 3, backgroundColor: "#f8fbff", border: "1px solid #e3f2fd" }}>
      <Typography variant="h6" sx={{ color: "#1565c0", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <LocationOn /> Location Selector
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", sm: "row" }, 
          gap: 2, 
          mb: 2 
        }}>
          <TextField
            fullWidth
            label="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            size="small"
            error={!!error && error.includes("Latitude")}
            helperText={error.includes("Latitude") ? error : ""}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#bbdefb",
                },
                "&:hover fieldset": {
                  borderColor: "#90caf9",
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            size="small"
            error={!!error && error.includes("Longitude")}
            helperText={error.includes("Longitude") ? error : ""}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#bbdefb",
                },
                "&:hover fieldset": {
                  borderColor: "#90caf9",
                },
              },
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<Search />}
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            Update Location
          </Button>
          <Button
            variant="outlined"
            startIcon={<MyLocation />}
            onClick={handleUseCurrentLocation}
            sx={{
              borderColor: "#bbdefb",
              color: "#1976d2",
              "&:hover": {
                borderColor: "#90caf9",
                backgroundColor: "rgba(144, 202, 249, 0.08)",
              },
            }}
          >
            Use My Location
          </Button>
        </Box>
      </form>

      <Typography variant="subtitle2" sx={{ color: "#1976d2", mt: 3, mb: 1 }}>
        Quick Locations:
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {predefinedLocations.map((location, index) => (
          <Chip
            key={index}
            label={location.name}
            onClick={() => handlePredefinedLocation(location.lat, location.lon)}
            sx={{
              backgroundColor: "#e3f2fd",
              color: "#1565c0",
              "&:hover": {
                backgroundColor: "#bbdefb",
              },
            }}
          />
        ))}
      </Box>

      <Box sx={{ mt: 2, p: 1.5, backgroundColor: "#e3f2fd", borderRadius: 1 }}>
        <Typography variant="caption" sx={{ color: "#1976d2", display: "block" }}>
          Current: {currentLocation.latitude}, {currentLocation.longitude}
        </Typography>
      </Box>
    </Paper>
  );
};

export default LocationSelector;
