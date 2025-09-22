const express = require("express");
const { Pool } = require("pg");
const app = express();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "portfolio_db",
  password: "Travis010799@",
  port: 5432,
});

app.use(express.json());
app.use(express.static("docs"));

app.post("/submit-contact", async (req, res) => {
  try {
    const { full_name, email, subject, message } = req.body;

    const result = await pool.query(
      "INSERT INTO contact_msg (full_name, email, subject, message, created_at) VALUES ($1,$2,$3,$4, NOW())",
      [full_name, email, subject, message]
    );

    res.json({
      success: true,
      message: "Saved to database!",
      data: { full_name },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to save to database!" });
  }
});

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
