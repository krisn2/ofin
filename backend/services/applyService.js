const db = require("../utils/db");

const submitApplication = async (data) => {
  try {
    await db.push('/ApplyDB[]', data); 
    return { success: true };
  } catch (error) {
    throw new Error("Error submitting application");
  }
};

module.exports = { submitApplication };
