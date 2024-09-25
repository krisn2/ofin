const db = require("../utils/db");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

// Fetch applications from the database
const getApplications = async () => {
  return await db.getData("/ApplyDB");
};

// Download applications as an Excel file
const downloadData = async () => {
  const data = await getApplications(); // Get applications data

  // Log the data to ensure it's in the expected format

  // Create a new workbook and add a worksheet with the data
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

  // Define the file path for the Excel file
  const filePath = path.join(__dirname, "../applications.xlsx"); // Adjust path as needed

  // Write the workbook to a file in .xlsx format
  XLSX.writeFile(workbook, filePath);
  
  return filePath; // Return the file path for download
};


// Delete an application by index
const deleteApplication = async (index) => {
  try {
    const currentData = await getApplications(); // Fetch all current data
    if (index >= 0 && index < currentData.length) {
      currentData.splice(index, 1); // Remove the item at the specified index
      db.push("/ApplyDB", currentData); // Save updated data back to the database
      return { message: "Application deleted successfully" };
    } else {
      throw new Error("Application not found");
    }
  } catch (error) {
    throw new Error("Error deleting application: " + error.message);
  }
};

module.exports = { getApplications, downloadData, deleteApplication };
