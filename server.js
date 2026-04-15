const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// Логи
console.log("Shark server started");

// Socket.io
io.on("connection", socket => {
  console.log("User connected:", socket.id);

  socket.on("message", data => {
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Отдаём version.json
app.get("/version", (req, res) => {
  res.sendFile(path.join(__dirname, "version.json"));
});

// Порт Railway
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
