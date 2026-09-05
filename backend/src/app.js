const express = require("express");
const cors = require("cors");
const pinoHttp = require("pino-http");

const logger = require("./config/logger");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(pinoHttp({ logger }));

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

module.exports = app;