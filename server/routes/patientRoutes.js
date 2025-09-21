// server/routes/patientRoutes.js

const express = require("express");
const router = express.Router();
const {
  getPatients,
  getPatientById,
  getPatientPrediction,
} = require("../controllers/patientController");

// @route   GET /api/patients
router.get("/", getPatients);

// @route   GET /api/patients/:id
router.get("/:id", getPatientById);

// @route   GET /api/patients/:id/predict
router.get("/:id/predict", getPatientPrediction);

module.exports = router;
