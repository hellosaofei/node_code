import express from "express";
import cors from "cors";
import multiparty from "multiparty";
// import fs-extra
import fse from "fs-extra/esm";
const app = express();
const UPLOAD_DIR = path.resolve(__dirname, "..", "public");

app.use(cors());
app.use(express.static("public"));

const form = new multiparty.Form();

app.post("/upload", (req, res) => {
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return;
    }
    const [chunk] = files.chunk;
    const [hash] = files.hash;
    const [filename] = files.filename;
    const chunkDir = path.resolve();

    if (!fse.existsSync(chunkDir)) {
      await fse.mkdirs(chunkDir);
    }

    await fse.move(chunk.path, `${chunkDir}/${hash}`);
    res.json({
      code: 200,
      message: "成功",
    });
  });
});

app.listen(8001, () => {
  console.log("服务已经启动，8001");
});
