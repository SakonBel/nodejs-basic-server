const express = require("express");

const postsRouter = require("./routes/postsRoutes");

// Initialize server
const app = express();

// Use router as sub-app
app.use("/api/v1/posts", postsRouter);

module.exports = app;
