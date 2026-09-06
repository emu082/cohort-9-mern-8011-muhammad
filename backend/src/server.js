require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const app = require("./app");
const { connectDB } = require("./config/db");
const { syncModels } = require("./models");
const logger = require("./config/logger");

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);


const io = new Server(server, {
  cors: { origin: "*" },
});

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error("No token provided"));
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = payload.userId;
    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
});

io.on("connection", (socket) => {
  
  socket.join(`user-${socket.userId}`);
});


app.set("io", io);

async function start() {
  await connectDB();
  await syncModels();
  server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}

start();