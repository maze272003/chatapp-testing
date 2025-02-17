const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chatdb",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Route to insert messages
app.post("/addMessage", (req, res) => {
  console.log("Received Data:", req.body);
  const { message, city } = req.body;

  if (!message || !city) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const query = "INSERT INTO messages (message, city) VALUES (?, ?)";
  db.query(query, [message, city], (err, result) => {
    if (err) {
      console.error("Database Insert Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: true, id: result.insertId });
  });
});

// Route to fetch messages
app.get("/messages", (req, res) => {
  db.query("SELECT * FROM messages", (err, results) => {
    if (err) {
      console.error("Database Fetch Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Route to fetch all tables and their data
app.get("/all-tables", (req, res) => {
  const query = "SHOW TABLES";

  db.query(query, (err, tables) => {
    if (err) {
      console.error("Database Tables Fetch Error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    let tablesData = {};
    let remainingTables = tables.length;

    if (remainingTables === 0) {
      return res.json(tablesData);
    }

    tables.forEach((table) => {
      const tableName = Object.values(table)[0];

      db.query(`SELECT * FROM ${tableName}`, (err, results) => {
        if (err) {
          console.error(`Error fetching data from table ${tableName}:`, err);
          tablesData[tableName] = "Error fetching data";
        } else {
          tablesData[tableName] = results;
        }

        remainingTables--;
        if (remainingTables === 0) {
          res.json(tablesData);
        }
      });
    });
  });
});

// Route to insert survey data
app.post("/addSurvey", (req, res) => {
  console.log("Survey route hit"); // Debugging
  const { name, feedback, rating } = req.body;

  if (!name || !feedback || !rating) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const query = "INSERT INTO survey (name, feedback, rating) VALUES (?, ?, ?)";
  db.query(query, [name, feedback, rating], (err, result) => {
    if (err) {
      console.error("Database Insert Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: true, id: result.insertId });
  });
});

// Start server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
