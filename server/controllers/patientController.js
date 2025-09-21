// controllers/patientController.js

const patientModel = require("../models/patientModel");

// --- Helper function: Apply guideline-based risk rules ---
const calculateRisk = (patient) => {
  let riskLevel = "Low";
  let reasons = [];

  // Cholesterol guideline
  if (patient.cholesterol > 240) {
    riskLevel = "High";
    reasons.push("High cholesterol (>240 mg/dL)");
  } else if (patient.cholesterol >= 200) {
    riskLevel = "Medium";
    reasons.push("Borderline cholesterol (200–239 mg/dL)");
  }

  // Blood pressure guideline
  if (patient.blood_pressure > 140) {
    riskLevel = "High";
    reasons.push("High blood pressure (>140 mmHg)");
  } else if (patient.blood_pressure >= 120) {
    if (riskLevel !== "High") riskLevel = "Medium";
    reasons.push("Elevated blood pressure (120–139 mmHg)");
  }

  // BMI guideline
  if (patient.bmi >= 30) {
    riskLevel = "High";
    reasons.push("Obesity (BMI ≥ 30)");
  } else if (patient.bmi >= 25) {
    if (riskLevel !== "High") riskLevel = "Medium";
    reasons.push("Overweight (BMI 25–29.9)");
  }

  // Glucose guideline
  if (patient.glucose >= 126) {
    riskLevel = "High";
    reasons.push("Diabetes (Glucose ≥ 126 mg/dL)");
  } else if (patient.glucose >= 100) {
    if (riskLevel !== "High") riskLevel = "Medium";
    reasons.push("Prediabetes (Glucose 100–125 mg/dL)");
  }

  return { riskLevel, reasons };
};

// --- Controller Functions ---

// Get all patients
const getPatients = async (req, res, next) => {
  try {
    const patients = await patientModel.getAllPatients();

    // Add risk calculation for each patient
    const patientsWithRisk = patients.map((p) => {
      const { riskLevel, reasons } = calculateRisk(p);
      return { ...p, riskLevel, reasons };
    });

    res.json(patientsWithRisk);
  } catch (error) {
    next(error);
  }
};

// Get a single patient by ID
const getPatient = async (req, res, next) => {
  try {
    const patient = await patientModel.getPatientById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const { riskLevel, reasons } = calculateRisk(patient);
    res.json({ ...patient, riskLevel, reasons });
  } catch (error) {
    next(error);
  }
};

// Add a new patient
const createPatient = async (req, res, next) => {
  try {
    const newPatient = await patientModel.addPatient(req.body);
    const { riskLevel, reasons } = calculateRisk(newPatient);

    res.status(201).json({ ...newPatient, riskLevel, reasons });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPatients,
  getPatient,
  createPatient,
};
