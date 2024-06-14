const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const SparkMD5 = require("spark-md5");
const multiparty = require("multiparty");

const PORT = 8888;
const uploadDir = `${__dirname}/upload`;

function handleMultiparty(req, res, temp) {
  return new Promise((resolve, reject) => {
    // multiparty的配置
    let options = {
      maxFieldsSize: 200 * 1024 * 1024,
    };
    !temp ? (options.uploadDir = uploadDir) : null;
    let form = new multiparty.Form(options);
    // multiparty解析
    form.parse(req, function (err, fields, files) {
      // 解析出现错误
      if (err) {
        res.send({
          code: 1,
          reason: err,
        });
        reject(err);
        return;
      }
      //   抛出数据
      resolve({
        fields,
        files,
      });
    });
  });
}

app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "1024mb",
  })
);

app.post("/upload", async (req, res) => {
  let { fields, files } = await handleMultiparty(req, res, true);

  let [chunk] = files.chunk;
  let [filename] = fields.filename;

  let hash = /([0-9a-zA-Z]+)_\d+/.exec(filename)[1];
  let suffix = /\.([0-9a-zA-Z]+)$/.exec(file.name)[1];
  let dirpath = `${uploadDir}/${hash}`;
  if (!fs.existsSync(dirpath)) {
    fs.mdkdir(dirpath);
  }
  const fileName = `${dirpath}/${filename}`;
  fs.access(path, async (err) => {
    if (!err) {
      res.send({
        code: 0,
        path: path.replace(__dirname, `http://127.0.0.1:${PORT}`),
      });
      return;
    }
  });

  let readStream = fs.createReadStream(chunk.path);
  let writeStream = fs.createWriteStream(fileName);

  readStream.pipe(writeStream);
  readStream.on("end", () => {
    fs.unlinkSync(chunk.path);
    res.send({
      code: 0,
      path: path.replace(__dirname, `http://127.0.0.1:${PORT}`),
    });
  });
});

app.listen(PORT, () => {
  console.log(`后端服务运行于：${PORT}`);
});
