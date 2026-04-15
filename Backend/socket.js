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
      // console.log("This your socket data:", data);
      //   console.log(`Join event payload for socket ${socket.id}:`, JSON.stringify(data));
        
        let payload = data;
        if (typeof data === "string") {
          try {
            payload = JSON.parse(data);
          } catch (err) {
            console.log("Invalid join payload JSON:", data);
            return;
          }
        }
        
        const { userId, userType } = payload || {};
        
        // Guard against undefined values
        if (!userId || !userType) {
          // console.log(`Invalid join data - missing userId or userType. Received:`, JSON.stringify(payload));
          return;
        }
        
        try {
          // Handle join logic based on user type
          if (userType === "user") {
            // console.log(`Attempting to update user ${userId} with socketId ${socket.id}`);
            const user = await User.findByIdAndUpdate(userId, { socketId: socket.id }, { new: true });
            // console.log(`User update result:`, user ? 'success' : 'user not found');
            if (!user) {
              // console.log(`User not found with ID: ${userId}`);
              return;
            }
          } else if (userType === "captain") {
            // console.log(`Attempting to update captain ${userId} with socketId ${socket.id}`);
            const captain = await Captain.findByIdAndUpdate(userId, { socketId: socket.id }, { new: true });
            // console.log(`Captain update result:`, captain ? 'success' : 'captain not found');
            if (!captain) {
              // console.log(`Captain not found with ID: ${userId}`);
              return;
            }
          }
          console.log(`User with ID ${userId} and type ${userType} joined with socket ID ${socket.id}`);
        } catch (error) {
          console.error(`Error in join handler:`, error);
        }
    });

    socket.on("registerSocketId", (socketId) => {
      socketClients.set(socketId, socket);
      console.log(`Registered socketId ${socketId} for socket ${socket.id}`);
    });

    socket.on("update-location-captain", async(data) => {
      // Handle location update logic
      const { userId, userType, location } = data;
      console.log(`Received location update from ${userType} ${userId}:`, location);

      // Validation
      if (!userId || userType !== "captain") {
        console.log("Invalid update-location-captain request: missing userId or not a captain");
        return;
      }

      if (!location || typeof location !== "object") {
        console.log("Invalid location: must be an object");
        return;
      }

      const { ltd, lng } = location;
      if (typeof ltd !== "number" || typeof lng !== "number") {
        console.log("Invalid location: ltd and lng must be numbers");
        return;
      }

      if (ltd < -90 || ltd > 90) {
        console.log("Invalid latitude: must be between -90 and 90");
        return;
      }

      if (lng < -180 || lng > 180) {
        console.log("Invalid longitude: must be between -180 and 180");
        return;
      }

      const captain = await Captain.findByIdAndUpdate(userId, {
        location: {
          type: "Point",
          coordinates: [lng, ltd], // [longitude, latitude] for GeoJSON
        }
      }, { new: true });
      
      if (captain) {
        console.log(`Updated location for captain ${userId}:`, captain.location);
      } else {
        console.log(`Captain not found with ID: ${userId}`);
      }
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
  getIo: () => io,
};
