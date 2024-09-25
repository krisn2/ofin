const { JsonDB, Config } = require("node-json-db");

const db = new JsonDB(new Config("ApplyDB", true, false, "/"));
module.exports = db;
