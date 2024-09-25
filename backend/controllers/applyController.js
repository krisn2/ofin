const { submitApplication } = require("../services/applyService");

const handleApplicationSubmit = async (req, res) => {
  const data = req.body;

  if (!data || !data.firstName || !data.email || !data.loanAmount || !data.address || !data.income) {
    return res.status(400).json({ success: false, message: "Invalid data: All fields are required." });
  }

  try {
    await submitApplication(data);
    res.status(200).json({ success: true, message: "Application submitted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error submitting application. Please try again later." });
  }
};

module.exports = { handleApplicationSubmit };
