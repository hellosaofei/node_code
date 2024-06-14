const sourceArr = document.querySelector("#sourceArr");
const resultArr = document.querySelector("#resultArr");
const sortBtn = document.querySelector("#sortBtn");

let arr = [4, 2, 3, 5, 7, 20];

sourceArr.textContent = arr.toString();

let worker = new Worker("worker.js");

sortBtn.addEventListener("click", () => {
  worker.postMessage(arr);
});

worker.onmessage = function (e) {
  resultArr.textContent = e.data;
};
