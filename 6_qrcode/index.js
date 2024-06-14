const QRCode = require("qrcode");
// QRCode.toFile("foo.png", [{ data: [253, 254, 255], mode: "byte" }]);
QRCode.toString("http://www.google.com", function (err, string) {
  if (err) throw err;
  console.log(string);
});
