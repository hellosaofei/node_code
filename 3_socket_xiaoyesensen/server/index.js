const Ws = require("ws");
(() => {
  const server = new Ws.Server({ port: 8082 });

  const init = () => {
    bindEvent();
  };

  function bindEvent() {
    server.on("connection", handleConn); // 只绑定 connection 事件到服务器对象
  }

  function handleConn(ws) {
    ws.on("message", handleMessage); // 绑定 message 事件到连接对象
    ws.on("close", handleClose); // 绑定 close 事件到连接对象
    ws.on("error", handleError); // 绑定 error 事件到连接对象
    console.log("ws connection established"); // 当连接建立时打印消息
  }

  function handleMessage(msg) {
    console.log("Received message: ", msg.toString());
    server.clients.forEach((client) => {
      client.send(msg.toString());
    });
  }

  function handleClose() {
    console.log("ws connection closed");
  }

  function handleError(error) {
    console.error("WebSocket error: ", error);
  }

  init();
})();
