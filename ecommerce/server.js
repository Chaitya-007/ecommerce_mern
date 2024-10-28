import express from "express";
import colors from "colors";
import dotenv from "dotenv";

// configure env
dotenv.config({});

// rest object
const app = express();

// rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

// PORT
const PORT = process.env.PORT || 8080;

// For React => PORT = 3000
// For Angular => PORT = 4200

app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.DEV_MODE} on http://localhost:${PORT}`
      .bgCyan.white
  );
});
