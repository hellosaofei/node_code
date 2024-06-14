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

// app.all("*", (req, res, next) => {
//   res.header("Access-Control-Allow-origin", "*");
//   res.header("Access-Control-Allow-Methods", "POST,GET");
//   next();
// });

app.post("/upload_video", (req, res) => {
  const { name, type, size, fileName, uploadedSize } = req.body;
  console.log(type, fileName, uploadedSize);
  const { file } = req.files;
  if (!file) {
    res.send({
      code: "10001",
      msg: "没有文件",
    });
    return;
  }

  if (!ALLOW_TYPE[type]) {
    res.send({
      code: 1001,
      msg: "上传格式非法",
    });
    return;
  }
  // const file_name = fileName + extname(name);
  const filePath = resolve(__dirname, "./upload_video/", fileName);
  console.log(filePath);
  // const test = resolve(__dirname, "./upload_video/", "test.mp4");
  //uploaded不为0，表示在上传过程中
  // if (uploadedSize !== 0) {
  //   //上传过程中，文件应该是存在的，如果不存在，可能是因为服务器端将文件进行了删除，终止本次传输
  //   if (!existsSync(filePath)) {
  //     res.send({
  //       code: "0",
  //       msg: "文件不存在",
  //     });
  //     return;
  //   }
  //   //正常进行上传过程，往里面添加数据
  //   appendFileSync(filePath, file.data);
  //   //添加完毕通知客户端
  //   res.send({
  //     code: "0",
  //     msg: "文件已创建",
  //     // data: {
  //     //   video_url: "http://localhost:8000/" + fileName,
  //     // },
  //   });
  //   return;
  // }
  // //如果uploaded为0，说明是第一次上传，创建一个新的文件并进行写入
  // writeFileSync(filePath, file.data);
  if (uploadedSize == 0) {
    writeFileSync(filePath, file.data);
  } else {
    appendFileSync(filePath, file.data);
  }
  res.send({
    code: "22",
    msg: "文件上传成功",
    data: {
      video_url: "http://localhost:8000/" + fileName,
    },
  });
});
app.listen(PORT, () => {
  console.log("服务器开启，8000");
});
