const express = require("express");
const uploader = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const { extname, resolve } = require("path");
const { existsSync, appendFileSync, writeFileSync } = require("fs");

const app = express();

const ALLOW_TYPE = {
  "video/mp4": "mp4",
  "video/ogg": "ogg",
};

const PORT = 8000;

app.use(uploader());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", express.static("upload_video"));

app.post("/upload_video", (req, res) => {
  const { name, type, size, uploadedSize } = req.body;
  const { file } = req.files;
  if (!file) {
    res.send({
      code: 10001,
      msg: "没有文件",
    });
    return;
  }

  if (!ALLOW_TYPE[type]) {
    res.send({
      code: 10002,
      msg: "上传格式非法",
    });
    return;
  }

  const filePath = resolve(__dirname, "upload_video", name);

  if (uploadedSize == 0) {
    writeFileSync(filePath, file.data);
  } else {
    appendFileSync(filePath, file.data);
  }
  res.json({
    code: 20000,
    msg: "文件片段成功",
  });
});

app.get("/hello", (req, res) => {
  res.json({
    code: 2000,
    message: "请求成功！！！",
  });
});
app.listen(PORT, () => {
  console.log("服务器开启，8000");
});
