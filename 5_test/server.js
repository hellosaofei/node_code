const express = require("express");
// const uploader = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", express.static("upload_video"));

app.post("/upload", (req, res) => {
  // console.log()
  res.write("您发送的数据为");
  // res.end(JSON.stringify(req.body, null, 2));
  console.log(req);
});

app.listen(PORT, () => {
  console.log("服务器开启，8000");
});
