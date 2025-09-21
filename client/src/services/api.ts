// src/services/api.ts

import axios from "axios";

// Base URL of your backend API
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Fetch all patients
export const getPatients = async () => {
  const response = await API.get("/patients");
  return response.data;
};

// Fetch single patient by ID
export const getPatientById = async (id: number) => {
  const response = await API.get(`/patients/${id}`);
  return response.data;
};

// Add a new patient
export const addPatient = async (patient: {
  name: string;
  age: number;
  gender: string;
  cholesterol: number;
  blood_pressure: number;
  bmi: number;
  glucose: number;
}) => {
  const response = await API.post("/patients", patient);
  return response.data;
};
