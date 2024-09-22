import { config } from "dotenv"; // Import dotenv for environment variable support
import { Server } from "socket.io"; // Import Server from socket.io

// Load environment variables from .env
config();

// Setup CORS and other options for Socket.io
const io = new Server({
  cors: {
    origin: "https://ghardekho-1-91if.onrender.com/", // Adjust this for your frontend URL
  },
});

// Use process.env.PORT with a fallback to 4000 for local development
const PORT = process.env.PORT || 4000;

let onlineUser = []; // Store all connected users

// Function to add a user to the online user list
const addUser = (userId, socketId) => {
  const userExists = onlineUser.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUser.push({ userId, socketId });
  }
};

// Function to remove a user from the online user list
const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

// Function to get a user by userId
const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

// Handle socket.io connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Add new user when they connect
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  // Handle sending messages
  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
    }
  });

  // Remove user on disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    removeUser(socket.id);
  });
});

// Listen on the port from .env or default to 4000
io.listen(PORT, () => {
  console.log(`Socket server is running on port ${PORT}`);
});
