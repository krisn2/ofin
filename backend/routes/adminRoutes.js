const express = require("express");
const fs = require("fs");
const path = require("path");
const ExcelJS = require("exceljs"); // Import ExcelJS to create Excel files
const { loginAdmin } = require("../controllers/adminController");
const { getApplications, downloadData,deleteApplication } = require("../services/adminServices");

const router = express.Router();

// Admin Login Route
router.post("/", loginAdmin);

// Fetch application data
router.post("/getdata", async (req, res) => {
  try {
    const data = await getApplications();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching data", error: error.message });
  }
});

router.get("/download", async (req, res) => {
  try {
    const filePath = await downloadData(); // Call the function to get the file path

    if (!filePath) {
      return res.status(404).json({ message: "File not found" });
    }

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File does not exist on the server" });
    }

    // Set the correct content type for Excel files
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    // Send the file for download
    res.download(filePath, "applications.xlsx", (err) => {
      // After the file has been sent, delete the file
      if (err) {
        console.error("File download error:", err.message);
        return res.status(500).send("Error during file download");
      }

      // Delete the file after download
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error deleting file:", unlinkErr.message);
        } else {
          console.log("File deleted successfully");
        }
      });
    });
  } catch (error) {
    console.error("Error generating or downloading file:", error.message);
    return res.status(500).json({
      message: "Error generating or downloading file",
      error: error.message,
    });
  }
});


// Delete application route
router.delete("/delete/:index", async (req, res) => {
  const index = req.params.index; // Get the index from the request parameters

  try {
    const response = await deleteApplication(index); // Call the delete function
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error deleting application:", error.message);
    return res.status(500).json({ message: "Error deleting application", error: error.message });
  }
});

module.exports = router;
