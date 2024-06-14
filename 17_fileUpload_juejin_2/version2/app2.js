var multiparty = require("multiparty");
var http = require("http");

const server = http.createServer();

server.on("request", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.url === "/upload" && req.method === "POST") {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ fields: fields, files: files }));
    });
    return;
  }
});

server.listen(8080, () => {
  console.log("服务端已经启动,8080");
});
