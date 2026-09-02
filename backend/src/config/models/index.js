

const { sequelize } = require("../config/db");
const User = require("./User");

async function syncModels() {
  await sequelize.sync({ alter: true });
}

module.exports = { sequelize, User, syncModels };