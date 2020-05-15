const express = require("express");
const path = require("path");
const app = express();

// Global Middleware
// Serving static files
app.use(express.static(path.join(__dirname, "../client/public")));

// Body parser,reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Test Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

module.exports = app;
