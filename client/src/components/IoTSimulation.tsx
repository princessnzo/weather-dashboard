import React, { useState, useEffect } from "react";
import { IoTData } from "../types/weather";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { Sensors, Update, Wifi } from "@mui/icons-material";
import io from "socket.io-client";

const socket = io("http://localhost:5001");

const IoTSimulation: React.FC = () => {
  const [iotData, setIotData] = useState<IoTData[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("iot-update", (data: IoTData) => {
      setIotData(prev => [data, ...prev.slice(0, 3)]);
    });

    return () => {
      socket.off("iot-update");
      socket.off("connect");
    };
  }, []);

  return (
    <Card sx={{ height: "100%", backgroundColor: "#e3f2fd" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Sensors sx={{ color: "#1976d2" }} />
          <Typography variant="h6" sx={{ color: "#1565c0" }}>
            IoT Live Data
          </Typography>
        </Box>
        
        <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
          <Chip 
            icon={<Update />}
            label={connected ? "MQTT Active" : "Connecting..."}
            color={connected ? "primary" : "default"}
            variant="outlined"
            size="small"
          />
          <Chip 
            icon={<Wifi />}
            label="WebSocket"
            color={connected ? "success" : "default"}
            variant="outlined"
            size="small"
          />
        </Box>
        
        {iotData.length > 0 ? (
          <Box>
            <Typography variant="subtitle2" sx={{ color: "#1976d2", mb: 1 }}>
              Latest Reading:
            </Typography>
            <Box sx={{ 
              p: 2, 
              backgroundColor: "white", 
              borderRadius: 2,
              mb: 2 
            }}>
              <Typography variant="h4" sx={{ color: "#0d47a1" }}>
                {iotData[0].temperature}°C
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                <Typography variant="body2" sx={{ color: "#1976d2" }}>
                  Humidity: {iotData[0].humidity}%
                </Typography>
                <Typography variant="body2" sx={{ color: "#1976d2" }}>
                  Wind: {iotData[0].windspeed} km/h
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body2" sx={{ color: "#1976d2" }}>
              {connected ? "Waiting for IoT data..." : "Connecting to server..."}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default IoTSimulation;
