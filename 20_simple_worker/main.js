const inputContainer = document.querySelector("input");
const resContainer = document.querySelector("p");
const myWorker = new Worker("worker.js");

inputContainer.onchange = function () {
  myWorker.postMessage(inputContainer.value);
  console.log("消息发送给了workerJS");
};
myWorker.onmessage = function (e) {
  resContainer.innerText = e.data;
  console.log("从workerJS接收到了数据");
};
