import { createServer } from "http";
import { WebSocketServer } from "ws";

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, World!\n");
});

const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log(`接受到了数据: ${data}`);
    ws.send(data.toString());
  });

  ws.send("something");
});

// wss.on("error", console.error);

// wss.on("open", function open() {
//   ws.send("something");
// });

// wss.on("message", (data) => {
//   console.log(`接受到了数据: ${data}`);
//   wss.send(data);
// });

server.listen(8080);
