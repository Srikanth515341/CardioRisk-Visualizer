// server.js

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const patientRoutes = require("./routes/patientRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

// Load environment variables from .env
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/patients", patientRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("CardioRisk Visualizer API is running...");
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
