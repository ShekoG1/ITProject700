const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// Endpoints
app.get("/test", (req, res) => {
    res.json({ message: "Test Successful" });
});
app.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});