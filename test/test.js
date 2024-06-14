const fs = require("fs");

// 创建一个可读流，从 source.txt 读取数据
const readStream = fs.createReadStream("source.txt", { encoding: "utf8" });

// 创建一个可写流，将数据写入 target.txt
const writeStream = fs.createWriteStream("target.txt");

// 监听 'data' 事件，每当有数据可读时触发
readStream.on("data", (chunk) => {
  // 将读取到的数据块写入目标文件
  writeStream.write(chunk);
});

// 监听 'end' 事件，当读取完整个文件后触发
readStream.on("end", () => {
  console.log("文件读取完毕");
  // 确保文件写入操作也已完成
  writeStream.end();
});

// 监听 'error' 事件，处理可能出现的错误
readStream.on("error", (err) => {
  console.error(`读取文件时出错: ${err.message}`);
});

writeStream.on("error", (err) => {
  console.error(`写入文件时出错: ${err.message}`);
});
