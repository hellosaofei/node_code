import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on("connection", (socket) => {});

httpServer.listen("3002", () => {
  console.log("服务已经启动，3002...");
});
