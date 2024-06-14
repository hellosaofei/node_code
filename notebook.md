# 文件流下载

## node 后端逻辑

```js
import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("./static"));

app.post("/download", function (req, res) {
  const fileName = req.body.fileName;
  const filePath = path.join(process.cwd(), "./static", fileName);
  const content = fs.readFileSync(filePath);
  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Disposition", "attachment;filename=" + fileName);
  res.send(content);
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
```

## 前端逻辑

核心逻辑：接受的返回值是流的方式 arrayBuffer，转成 blob，生成下载链接，模拟 a 标签点击下载

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="btn">download</button>

    <script>
      const btn = document.getElementById("btn");
      btn.onclick = () => {
        fetch("http://localhost:3000/download", {
          method: "post",
          body: JSON.stringify({
            fileName: "1.png",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.arrayBuffer())
          .then((res) => {
            const blob = new Blob([res], { type: "image/png" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "1.png";
            a.click();
          });
      };
    </script>
  </body>
</html>
```
