const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const connectToDB = require("./Startup/db");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const Messages = require("./Model/message.model");
const promptRoute = require("./Route/prompt.route");

connectToDB();
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use(
  cors({
    origin: `${process.env.WEB_URL}`,
  })
);

app.use("/api", promptRoute);

const rooms = {}; // roomId -> Set of usernames

io.on("connection", (socket) => {
  console.log(`⚡ New client connected: ${socket.id}`);

  // Create / join a room
  socket.on("join-room", async ({ roomId, username }) => {
    socket.join(roomId);
    socket.username = username;
    socket.roomId = roomId;

    if (!rooms[roomId]) rooms[roomId] = new Set();
    rooms[roomId].add(username);

    // Send previous messages to the joining user
    const history = await Messages.find({ roomId }).sort({ timestamp: 1 });
    socket.emit("chat-history", history);

    // Send updated user list
    io.to(roomId).emit("room-users", Array.from(rooms[roomId]));

    console.log(`${username} joined room: ${roomId}`);
  });

  socket.on("code-change", ({ roomId, code, username, position }) => {
    // Broadcast to others in room (not the sender)
    socket.to(roomId).emit("code-update", { code, username, position });
  });

  // Handle chat messages
  socket.on(
    "chat-message",
    async ({ roomId, username, message, timestamp }) => {
      const msgData = {
        roomId,
        username,
        message,
        timestamp: timestamp ? new Date(timestamp) : new Date(),
      };

      const savedMessage = await Messages.create(msgData);
      io.to(roomId).emit("chat-update", savedMessage);
    }
  );

  // Leave room
  socket.on("leave-room", () => {
    const { roomId, username } = socket;
    if (roomId && rooms[roomId]) {
      rooms[roomId].delete(username);
      io.to(roomId).emit("room-users", Array.from(rooms[roomId]));
      console.log(`${username} left room: ${roomId}`);
      socket.leave(roomId);

      if (rooms[roomId].size === 0) {
        delete rooms[roomId];
        Messages.deleteMany({ roomId }).then(() =>
          console.log(`🗑 Deleted messages for inactive room ${roomId}`)
        );
      }
      socket.roomId = null;
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    const { roomId, username } = socket;
    if (roomId && rooms[roomId]) {
      rooms[roomId].delete(username);
      io.to(roomId).emit("room-users", Array.from(rooms[roomId]));
    }
    console.log(
      `❌ ${username || "Unknown"} disconnected from ${roomId || "N/A"}`
    );
  });
});

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`Server connected to ${PORT}`);
});
