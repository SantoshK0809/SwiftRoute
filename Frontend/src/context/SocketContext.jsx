import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { io } from "socket.io-client";

export const SocketDataContext = createContext();

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_BASE_URL || "http://localhost:4000";

const SocketContext = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socketClient = io(SOCKET_URL, {
      transports: ["websocket"],
      auth: {
        token: localStorage.getItem("token") || "",
      },
      autoConnect: true,
    });

    socketClient.on("connect", () => {
      console.log("Socket connected:", socketClient.id);
      
      // Try to get userId from localStorage first
      let userId = localStorage.getItem("userId");
      let userType = localStorage.getItem("userRole");
      
      // If not in localStorage, try to decode from JWT token
      if (!userId) {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            userId = payload._id;
            userType = "user"; // Assume user for now, can be extended for captain
            console.log("Decoded userId from token:", userId);
          } catch (err) {
            console.error("Failed to decode token:", err);
          }
        }
      }
      
      if (userId && userType) {
        console.log("About to emit join with:", { userId, userType });
        socketClient.emit("join", { userType, userId });
        console.log("Socket join emitted:", { userId, userType });
      } else {
        console.log("Socket connected, but no userId/userType available for join.");
      }
      
      setConnected(true);
    });

    socketClient.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setConnected(false);
    });

    socketClient.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    setSocket(socketClient);

    return () => {
      socketClient.off("connect");
      socketClient.off("disconnect");
      socketClient.off("connect_error");
      socketClient.disconnect();
    };
  }, []);

  const sendMessageToEvent = useCallback(
    (eventName, payload) => {
      if (!socket || !connected) {
        console.warn("Socket is not connected yet.");
        return;
      }

      console.log(`Sending message: ${payload} to ${eventName}`)

      socket.emit(eventName, payload);
    },
    [socket, connected],
  );

  const subscribeToEvent = useCallback(
    (eventName, callback) => {
      if (!socket) {
        return () => {};
      }

      socket.on(eventName, callback);

      return () => {
        socket.off(eventName, callback);
      };
    },
    [socket],
  );

  const value = useMemo(
    () => ({
      connected,
      socket,
      sendMessageToEvent,
      subscribeToEvent,
    }),
    [connected, socket, sendMessageToEvent, subscribeToEvent],
  );

  return (
    <SocketDataContext.Provider value={value}>
      {children}
    </SocketDataContext.Provider>
  );
};

export const useSocket = () => useContext(SocketDataContext);

export default SocketContext;
