// index.js -> bundle.js
// var QRCode = require("qrcode");
var canvas = document.getElementById("canvas");

var QRCode = QRCode.toCanvas(canvas, "sample text", function (error) {
  if (error) console.error(error);
  console.log("success!");
});
