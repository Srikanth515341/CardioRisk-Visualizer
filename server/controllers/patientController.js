// server/controllers/patientController.js

const db = require("../config/db");

// Helper function for simple prediction (linear trend)
function predictFuture(values, months = 6) {
  const predictions = [];
  const n = values.length;
  if (n < 2) {
    // Not enough data, just repeat last value
    for (let i = 1; i <= months; i++) {
      predictions.push(values[n - 1]);
    }
    return predictions;
  }

  const lastValue = values[n - 1];
  const secondLast = values[n - 2];
  const slope = lastValue - secondLast; // simple difference

  for (let i = 1; i <= months; i++) {
    predictions.push(lastValue + slope * i);
  }

  return predictions;
}

// @desc    Get all patients
exports.getPatients = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM patients ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Get single patient
exports.getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM patients WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Predict future vitals for a patient
exports.getPatientPrediction = async (req, res) => {
  try {
    const { id } = req.params;

    // Get patient data
    const result = await db.query("SELECT * FROM patients WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const patient = result.rows[0];

    // Mock historical data (you could extend DB later)
    const cholesterolHistory = [200, 210, 220];
    const bpHistory = [120, 125, 130];
    const bmiHistory = [25, 25.5, 26];
    const glucoseHistory = [100, 105, 110];

    // Predict next 6 months
    const predictions = {
      cholesterol: predictFuture(cholesterolHistory, 6),
      blood_pressure: predictFuture(bpHistory, 6),
      bmi: predictFuture(bmiHistory, 6),
      glucose: predictFuture(glucoseHistory, 6),
    };

    res.json({
      patientId: patient.id,
      name: patient.name,
      predictions,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
