const { Sequelize } = require("sequelize");
const logger = require("./logger");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_SERVER,
    port: process.env.DB_PORT,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    },
    logging: false,
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    logger.info("Connected to the database!");
  } catch (err) {
    logger.error("Could not connect to the database:", err);
  }
}

module.exports = { sequelize, connectDB };