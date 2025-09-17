const express = require("express");

const postsRouter = require("./routes/postsRoutes");

// Initialize server
const app = express();
// Look at the environment that we are currently in.
console.log(app.get("env"));

// Parse JSON bodies
app.use(express.json());
// Serve static files
app.use(express.static(`${__dirname}/public`));
// Use router as sub-app
app.use("/api/v1/posts", postsRouter);

module.exports = app;
