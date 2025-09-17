const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });
// Look at environment variables
console.log(process.env);

const PORT = 8000;
// Listening on the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}......`);
});
