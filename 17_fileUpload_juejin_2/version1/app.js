const http = require("http");
const path = require("path");
const fse = require("fs-extra");
const multiparty = require("multiparty");

const server = http.createServer();
const upload_dir = path.resolve(__dirname, "..", "public");

server.on("request", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.status = 200;
    res.end();
    return;
  }

  const form = multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) {
      return;
    }
    const [chunk] = files.chunk;
    const [hash] = fields.hash;
    const [filename] = fields.filename;
    console.log(chunk, hash, filename);
    // const chunkDir = path.resolve(upload_dir,'upload_video',filename);

    // fse.writeFileSync()
  });
});

server.listen(8001, () => {
  console.log("服务端已经启动！！！");
});
