const http = require("http");

const fs = require("fs");
const { stat } = require("node:fs/promises");
const videoPath = "./upload/9月20日.mp4";

http
  .createServer(async (req, res) => {
    if (req.url == "/") {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.end(`<video src="/video" width="500" controls></video>`);
    } else if (req.url == "/video") {
      let range = req.headers["range"];
      if (range) {
        let stats = await stat(videoPath);
        let r = range.match(/=(\d+)-(\d+)?/);
        let start = parseInt(r[1], 10);
        let end = r[2] ? parseInt(r[2], 10) : start + 1024 * 1024;
        if (end > stats.size - 1) {
          end = stats.size - 1;
        }
        let head = {
          "Content-Type": "video/mp4",
          "Content-Range": `bytes ${start}-${end}/${stats.size}`,
          "Content-Length": end - start + 1,
          "Accept-Ranges": "bytes",
        };
        res.writeHead(206, head);
        fs.createReadStream(videoPath, { start, end }).pipe(res);
      } else {
        fs.createReadStream(videoPath).pipe(res);
      }
    }
  })
  .listen(3001, () => {
    console.log("服务云运行于端口：3001");
  });
