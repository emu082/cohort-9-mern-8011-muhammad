require("dotenv").config();
const app = require("./app");
const { connectDB } = require("./config/db");
const { syncModels } = require("./models");
const logger = require("./config/logger");

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  await syncModels();
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}

start();