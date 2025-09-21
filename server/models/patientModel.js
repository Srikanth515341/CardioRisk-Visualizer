// models/patientModel.js

const pool = require("../config/db");

// Fetch all patients
const getAllPatients = async () => {
  const result = await pool.query("SELECT * FROM patients ORDER BY id ASC");
  return result.rows;
};

// Fetch a single patient by ID
const getPatientById = async (id) => {
  const result = await pool.query("SELECT * FROM patients WHERE id = $1", [id]);
  return result.rows[0];
};

// Insert a new patient record
const addPatient = async (patient) => {
  const { name, age, gender, cholesterol, blood_pressure, bmi, glucose } = patient;

  const result = await pool.query(
    `INSERT INTO patients (name, age, gender, cholesterol, blood_pressure, bmi, glucose)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [name, age, gender, cholesterol, blood_pressure, bmi, glucose]
  );

  return result.rows[0];
};

module.exports = {
  getAllPatients,
  getPatientById,
  addPatient,
};
