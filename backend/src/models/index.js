const { sequelize } = require("../config/db");
const User = require("./User");
const Note = require("./Note");
const logger = require("../config/logger");

async function syncModels() {
  try {
    await sequelize.sync({ alter: true });
    logger.info("Database tables are synced!");
  } catch (err) {
    logger.error("Failed to sync database tables:", err);
    throw err;
  }
}

module.exports = { sequelize, User, Note, syncModels };