self.onmessage = function (e) {
  console.log("workerJS接收到了来自mainJS的消息");
  const calculateRes = e.data ** 2;
  self.postMessage(calculateRes);
  console.log("计算结果发送给了mainJS");
};
