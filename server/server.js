const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const http = require("http");
const socketIo = require("socket.io");
const mqtt = require("mqtt");

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Configure CORS for Socket.IO
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "Weather Dashboard API",
    version: "1.0.0",
  });
});

// Weather API endpoint
app.get("/api/weather", async (req, res) => {
  try {
    const { latitude = "25.75", longitude = "28.19" } = req.query;

    console.log(`Fetching weather for lat: ${latitude}, lon: ${longitude}`);

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
    );

    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Add timestamp to data
    data.timestamp = new Date().toISOString();
    data.source = "Open-Meteo API";

    res.json(data);
  } catch (error) {
    console.error("Weather API Error:", error);
    res.status(500).json({
      error: "Failed to fetch weather data",
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// IoT Simulation Setup
let mqttClient = null;
let iotInterval = null;

// Initialize MQTT connection
const initializeMQTT = () => {
  try {
    mqttClient = mqtt.connect("mqtt://test.mosquitto.org", {
      clientId: "weather-dashboard-" + Math.random().toString(16).substr(2, 8),
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    });

    mqttClient.on("connect", () => {
      console.log("✅ MQTT Connected to broker");
      mqttClient.subscribe("weather/simulation", { qos: 1 });

      // Start IoT data simulation
      iotInterval = setInterval(() => {
        const simulatedData = {
          device_id: "iot-weather-001",
          timestamp: new Date().toISOString(),
          temperature: (Math.random() * 15 + 15).toFixed(1), // 15-30°C
          humidity: (Math.random() * 30 + 40).toFixed(1), // 40-70%
          windspeed: (Math.random() * 20).toFixed(1), // 0-20 km/h
          pressure: (Math.random() * 20 + 980).toFixed(1), // 980-1000 hPa
          battery: (Math.random() * 20 + 80).toFixed(1), // 80-100%
          signal_strength: Math.floor(Math.random() * 5) + 1, // 1-5 bars
        };

        mqttClient.publish(
          "weather/simulation",
          JSON.stringify(simulatedData),
          { qos: 1 }
        );
        console.log("📡 Published IoT data:", simulatedData.device_id);
      }, 3000); // Publish every 3 seconds
    });

    mqttClient.on("error", (error) => {
      console.error("❌ MQTT Error:", error);
    });

    mqttClient.on("close", () => {
      console.log("🔌 MQTT Connection closed");
      if (iotInterval) {
        clearInterval(iotInterval);
      }
    });
  } catch (error) {
    console.error("❌ Failed to initialize MQTT:", error);
  }
};

// Initialize MQTT connection
initializeMQTT();

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log(`🔗 Client connected: ${socket.id}`);

  // Send welcome message
  socket.emit("welcome", {
    message: "Connected to Weather Dashboard Server",
    connection_id: socket.id,
    timestamp: new Date().toISOString(),
  });

  // Forward MQTT messages to WebSocket clients
  if (mqttClient) {
    const messageHandler = (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        socket.emit("iot-update", {
          ...data,
          protocol: "MQTT",
          topic: topic,
        });
      } catch (error) {
        console.error("Failed to parse MQTT message:", error);
      }
    };

    mqttClient.on("message", messageHandler);

    // Clean up on disconnect
    socket.on("disconnect", () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
      if (mqttClient) {
        mqttClient.removeListener("message", messageHandler);
      }
    });
  }

  // Handle client requests
  socket.on("request-weather", async (data) => {
    try {
      const { latitude, longitude } = data;
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await response.json();
      socket.emit("weather-update", weatherData);
    } catch (error) {
      socket.emit("error", { message: "Failed to fetch weather data" });
    }
  });
});

// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌤️ Weather API: http://localhost:${PORT}/api/weather`);
  console.log(`📡 WebSocket: ws://localhost:${PORT}`);
});
