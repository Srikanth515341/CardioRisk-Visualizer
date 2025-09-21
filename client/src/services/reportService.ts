// src/services/reportService.ts

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Export a section of the dashboard as PDF
 * @param elementId - ID of the HTML element to capture (e.g., "dashboard-report")
 */
export const exportToPDF = async (elementId: string) => {
  const input = document.getElementById(elementId);
  if (!input) {
    console.error("Element not found:", elementId);
    return;
  }

  try {
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    // Calculate scaling to fit A4 page
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("CardioRisk_Report.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
