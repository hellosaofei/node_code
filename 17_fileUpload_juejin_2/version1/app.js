const http = require("http");
const path = require("path");

const multiparty = require("multiparty");

const server = http.createServer();
const upload_dir = path.resolve();

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
    const [hash] = files.hash;
    const [filename] = files.filename;
    const chunkDir = path.resolve();
    // const chunkDir
  });
});

server.listen(3000, () => {
  console.log("服务端已经启动！！！");
});
