const path = require("path");
const fs = require("fs");

// fs.readdir(__dirname, { recursive: true }, (err, files) => {
//   if (err) {
//     return;
//   }
//   console.log(files);
// });
const ss = fs.readdirSync(__dirname);
console.log(ss);
// const a = path.resolve(__dirname, "..");
// const isExist = fs.existsSync(a);
// console.log(isExist);
// const a = path.resolve(__dirname, "..");

// console.log(a);
