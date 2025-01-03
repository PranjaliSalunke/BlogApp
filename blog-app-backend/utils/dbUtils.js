const fs = require("fs");

const readDB = (path) => {
  try {
    const data = fs.readFileSync(path, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading the DB file:", err);
    throw new Error("Error reading database");
  }
};

const writeDB = (path, data) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing to the DB file:", err);
    throw new Error("Error writing to database");
  }
};

module.exports = { readDB, writeDB };
