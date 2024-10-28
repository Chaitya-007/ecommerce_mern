const express = require("express");

// rest object
const app = express();

// rest api
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to ecommerce app",
  });
});

// PORT
const PORT = 8080;

// For React => PORT = 3000
// For Angular => PORT = 4200

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
