// routes/patientRoutes.js

const express = require("express");
const {
  getPatients,
  getPatient,
  createPatient,
} = require("../controllers/patientController");

const router = express.Router();

// @route   GET /api/patients
// @desc    Get all patients with risk stratification
router.get("/", getPatients);

// @route   GET /api/patients/:id
// @desc    Get a single patient by ID with risk stratification
router.get("/:id", getPatient);

// @route   POST /api/patients
// @desc    Add a new patient
router.post("/", createPatient);

module.exports = router;
