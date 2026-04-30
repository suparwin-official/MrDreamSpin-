import http from "http";
import { initSocket } from "./socket/socket.js";

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
  console.log(`🔥 Server + Socket running on ${PORT}`);
});
