# CardioRisk Visualizer – API Specification

This document describes the backend API for the **CardioRisk Visualizer** project.  
The API provides endpoints for managing patient data, applying cardiovascular guidelines, and calculating risk stratification.

---

## Base URL
http://localhost:5000/api/patients

pgsql
Copy code

---

## Endpoints

### 1. Get All Patients
**GET** `/api/patients`

- **Description**: Returns all patients with examination results and calculated risk stratification.  
- **Response Example**:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "age": 52,
    "gender": "Male",
    "cholesterol": 250,
    "blood_pressure": 145,
    "bmi": 31,
    "glucose": 130,
    "riskLevel": "High",
    "reasons": [
      "High cholesterol (>240 mg/dL)",
      "High blood pressure (>140 mmHg)",
      "Obesity (BMI ≥ 30)",
      "Diabetes (Glucose ≥ 126 mg/dL)"
    ]
  }
]
2. Get Patient by ID
GET /api/patients/:id

Description: Returns details for a single patient, including calculated risk level.

Response Example:

json
Copy code
{
  "id": 2,
  "name": "Alice Smith",
  "age": 45,
  "gender": "Female",
  "cholesterol": 210,
  "blood_pressure": 130,
  "bmi": 27,
  "glucose": 110,
  "riskLevel": "Medium",
  "reasons": [
    "Borderline cholesterol (200–239 mg/dL)",
    "Elevated blood pressure (120–139 mmHg)",
    "Overweight (BMI 25–29.9)",
    "Prediabetes (Glucose 100–125 mg/dL)"
  ]
}
3. Add New Patient
POST /api/patients

Description: Adds a new patient record. The risk level is calculated automatically.

Request Body Example:

json
Copy code
{
  "name": "Mark Lee",
  "age": 50,
  "gender": "Male",
  "cholesterol": 180,
  "blood_pressure": 118,
  "bmi": 24,
  "glucose": 90
}
Response Example:

json
Copy code
{
  "id": 3,
  "name": "Mark Lee",
  "age": 50,
  "gender": "Male",
  "cholesterol": 180,
  "blood_pressure": 118,
  "bmi": 24,
  "glucose": 90,
  "riskLevel": "Low",
  "reasons": []
}
Error Responses
404 Not Found

json
Copy code
{ "message": "Patient not found" }
500 Server Error

json
Copy code
{ "message": "Server Error" }
Notes
Risk levels are based on official cardiovascular guidelines (cholesterol, blood pressure, BMI, glucose thresholds).

This API is designed for prototype development and demonstration.

Frontend (React + TypeScript) will consume these endpoints to visualize patient data and risk models.

yaml
Copy code

---

✅ With this doc:  
- You’ve covered **prototype documentation** requirement from the JD.  
- It explains endpoints, inputs, outputs, and risk rules.  

---

👉 Now your **server-side (backend) is 100% complete** — package structure + code + docs.  

Do you want me to now move on to the **database schema (PostgreSQL tables and fields)** so you can create them?





Ask ChatGPT
