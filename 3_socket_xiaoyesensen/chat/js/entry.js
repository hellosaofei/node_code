((doc, storage) => {
  const nameInput = doc.querySelector("input");
  const enterBtn = doc.querySelector("button");
  const init = () => {
    bindEvent();
  };
  function bindEvent() {
    enterBtn.onclick = (event) => {
      const username = nameInput.value;
      if (username.length < 6) {
        alert("用户名不小于6位");
        return;
      }
      storage.setItem("username", username);
      location.href = "index.html";
    };
  }
  init();
})(document, localStorage);
