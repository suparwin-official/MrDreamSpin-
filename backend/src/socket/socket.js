import { Server } from "socket.io";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" }
  });

  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("spin", (data) => {
      io.emit("spinResult", data);
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected");
    });
  });
};
