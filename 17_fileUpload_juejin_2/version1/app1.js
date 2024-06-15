const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const uploader = require("express-fileupload");

const app = express();
const UPLOAD_DIR = path.resolve(__dirname, "public");
let chunksDir = "";

const pipeStream = (path, writeStream) => {
  return new Promise((resolve) => {
    const readStream = fs.createReadStream(path);
    readStream.on("end", () => {
      fs.unlinkSync(path);
      console.log("文件读取完毕，删除", path);
      resolve();
    });
    readStream.pipe(writeStream);
  });
};

app.use(cors());
app.use(uploader());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/upload", (req, res) => {
  // console.log(req.body);
  const { filename, hash } = req.body;
  // console.log(req.files);
  const { chunk } = req.files;
  chunksDir = path.resolve(UPLOAD_DIR, `${filename}`);
  if (!fs.existsSync(chunksDir)) {
    fs.mkdirSync(chunksDir);
  }
  fs.writeFileSync(`${chunksDir}/${hash}`, chunk.data);
  res.json({
    code: 2000,
    message: "成功",
  });
});

app.post("/merge", async (req, res) => {
  const { filename, chunkSize, extension } = req.body;
  // 最终文件保存的父目录
  chunksDir = path.resolve(UPLOAD_DIR, filename);
  // 最终文件保存的文件
  const filePath = path.resolve(chunksDir, filename) + "." + extension;
  // 读取所有chunk，
  const ChunkPathList = fs.readdirSync(chunksDir);
  // 对chunk进行排序
  ChunkPathList.sort((a, b) => a.split("-")[1] - b.split("-")[1]);

  await Promise.all(
    // 流式读取与写入
    ChunkPathList.map((chunkPath, index) => {
      pipeStream(
        path.resolve(chunksDir, chunkPath),
        fs.createWriteStream(filePath, {
          start: index * chunkSize,
        })
      );
    })
  );
  res.json({
    code: 2000,
    message: "文件切片合成成功！！！",
  });
});

app.listen(8001, () => {
  console.log("服务已经启动，8001");
});
