const express = require("express");
const connection = require("./config/db");
const { bookRouter } = require("./routes/book.routes");
require('dotenv').config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/home", (req, res) => {
  res.send("Home_Page of Book App");
});

app.use("/books", bookRouter);

const PORT = process.env.PORT || 8000; // Use the environment variable PORT or default to 3000

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
    console.log("Cannot connect to the database");
  }
  console.log(`Server running on port ${PORT}`);
});
