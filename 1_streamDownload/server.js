import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("../static"));

app.post("/download", function (req, res) {
  const fileName = req.body.fileName;
  const filePath = path.join(process.cwd(), "../static", fileName);
  const content = fs.readFileSync(filePath);
  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Disposition", "attachment;filename=" + fileName);
  res.send(content);
});

app.listen(3001, () => {
  console.log("http://localhost:3001");
});
