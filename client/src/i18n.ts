// client/src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Define translations
const resources = {
  en: {
    translation: {
      title: "CardioRisk Visualizer Dashboard",
      simulation: "What-if Simulation",
      cholesterol: "Cholesterol (mg/dL)",
      bloodPressure: "Blood Pressure (mmHg)",
      bmi: "BMI",
      glucose: "Glucose (mg/dL)",
      runSimulation: "Run Simulation",
      riskLevel: "Risk Level",
      guidelineMode: "Guideline Mode",
      officialGuidelines: "Official Guidelines",
      customGuidelines: "Custom Guidelines",
      exportPDF: "Export PDF",
      loading: "Loading patients..."
    },
  },
  fr: {
    translation: {
      title: "Tableau de bord Visualiseur CardioRisk",
      simulation: "Simulation 'Et si'",
      cholesterol: "Cholestérol (mg/dL)",
      bloodPressure: "Pression artérielle (mmHg)",
      bmi: "IMC",
      glucose: "Glucose (mg/dL)",
      runSimulation: "Lancer la simulation",
      riskLevel: "Niveau de risque",
      guidelineMode: "Mode directives",
      officialGuidelines: "Directives officielles",
      customGuidelines: "Directives personnalisées",
      exportPDF: "Exporter en PDF",
      loading: "Chargement des patients..."
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
