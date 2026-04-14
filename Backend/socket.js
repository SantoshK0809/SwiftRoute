const { Server } = require("socket.io");
const User = require("./src/models/user.model");
const Captain = require("./src/models/captain.model");

let io;
const socketClients = new Map();

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("join", async (data) => {
        const { userId, role } = data;
        // Handle join logic based on user role
        if (role === "user") {
          const user = await User.findByIdAndUpdate(userId, { socketId: socket.id }, { new: true });
        } else if (role === "captain") {
          const captain = await Captain.findByIdAndUpdate(userId, { socketId: socket.id }, { new: true });
        }
        console.log(`User with ID ${userId} and role ${role} joined with socket ID ${socket.id}`);
    });

    socket.on("registerSocketId", (socketId) => {
      socketClients.set(socketId, socket);
      console.log(`Registered socketId ${socketId} for socket ${socket.id}`);
    });

    socket.on("disconnect", () => {
      socketClients.forEach((clientSocket, clientId) => {
        if (clientSocket.id === socket.id) {
          socketClients.delete(clientId);
        }
      });
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
}

function sendMessageToSocketId(socketId, message) {
  if (!io) {
    throw new Error("Socket server has not been initialized");
  }

  const socket = socketClients.get(socketId);
  if (!socket) {
    throw new Error(`Socket not found for id ${socketId}`);
  }

  socket.emit("message", message);
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
