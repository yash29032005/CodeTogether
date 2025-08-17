const dotenv = require("dotenv");
const express = require("express");
dotenv.config();
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
let rooms = {}; // roomId -> { users: Set, files: [] }

io.on("connection", (socket) => {
  console.log(`⚡ New client connected: ${socket.id}`);

  // Join room
  socket.on("join-room", async ({ roomId, username }) => {
    socket.join(roomId);
    socket.username = username;
    socket.roomId = roomId;

    if (!rooms[roomId]) {
      rooms[roomId] = { users: new Set(), files: [] };
    }

    rooms[roomId].users.add(username);

    // Send current room data (users + files)
    io.to(roomId).emit("room-users", Array.from(rooms[roomId].users));
    socket.emit("file-update", { files: rooms[roomId].files });

    // Send previous chat history
    const history = await Messages.find({ roomId }).sort({ timestamp: 1 });
    socket.emit("chat-history", history);

    console.log(`${username} joined room: ${roomId}`);
  });

  // Chat
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

  // File update (add / delete / rename etc.)
  socket.on("file-update", ({ roomId, files, username }) => {
    if (rooms[roomId]) {
      rooms[roomId].files = files;
      socket.to(roomId).emit("file-update", { files, username });
      console.log(`📂 File update in ${roomId} by ${username}`);
    }
  });

  // File content update (live typing)
  socket.on(
    "file-content-update",
    ({ roomId, fileName, content, username, position }) => {
      if (rooms[roomId]) {
        rooms[roomId].files = rooms[roomId].files.map((f) =>
          f.name === fileName ? { ...f, content, saved: false } : f
        );

        socket.to(roomId).emit("file-content-update", {
          fileName,
          content,
          username,
          position,
        });
      }
    }
  );

  // Leave room
  socket.on("leave-room", () => {
    const { roomId, username } = socket;
    if (roomId && rooms[roomId]) {
      rooms[roomId].users.delete(username);

      io.to(roomId).emit("room-users", Array.from(rooms[roomId].users));
      console.log(`${username} left room: ${roomId}`);

      socket.leave(roomId);

      if (rooms[roomId].users.size === 0) {
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
      rooms[roomId].users.delete(username);
      io.to(roomId).emit("room-users", Array.from(rooms[roomId].users));
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
