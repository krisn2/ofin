// config.js
require('dotenv').config(); // Load environment variables from .env file

const PORT = process.env.PORT || 5000; // Use PORT from environment or default to 5000
const JWT_SECRET = process.env.JWT_SECRET; // Load JWT_SECRET from environment variables

module.exports = { PORT, JWT_SECRET }; // Export the configuration
