((doc) => {
  const messageBtn = doc.querySelector("button");
  const messageInput = doc.querySelector("input");
  const messgageList = doc.querySelector("ul");
  let username = "";
  const ws = new WebSocket("ws:localhost:8082");

  const init = () => {
    bindEvent();
  };
  function bindEvent() {
    messageBtn.addEventListener("click", handleBtnClick, false);
    ws.addEventListener("open", handleOpen, false);
    ws.addEventListener("close", handleClose, false);
    ws.addEventListener("error", handleError, false);
    ws.addEventListener("message", handleMessage, false);
  }
  function handleBtnClick() {
    const messContent = messageInput.value;

    if (messContent.trim().length == 0) {
      return;
    }
    ws.send(
      JSON.stringify({
        user: username,
        time: new Date().getTime(),
        message: messContent,
      })
    );
    messageInput.value = "";
  }
  function handleOpen(event) {
    username = localStorage.getItem("username");
    if (!username) {
      location.href = "entry.html";
    }

    console.log("ws open");
  }
  function handleClose(event) {
    console.log("ws close");
  }
  function handleError(event) {
    console.log("send error");
  }
  function handleMessage(event) {
    console.log(event);
    const msgData = JSON.parse(event.data);
    messgageList.appendChild(createMsgEle(msgData));
    console.log("send mesage");
  }
  function createMsgEle(data) {
    const { user, time, message } = data;
    const listItem = doc.createElement("li");
    listItem.innerHTML = `
      <p>
      <span>${user}</span>
      <i>${time}</i></p>
      <p>${message}</p>
      
      `;
    return listItem;
  }
  init();
})(document);
