// console.log(__dirname);
// import path from "path";
// import { fileURLToPath } from "node:url";
// const path = require("path");
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const s = path.resolve(__dirname, "dddd");
// const ss = path.resolve(__dirname, "..", "dddd");
// console.log(ss);
var path = require("path"); //引入node的path模块

// const a1 = path.resolve("/foo/bar", "./baz"); // returns '/foo/bar/baz'
// const a2 = path.resolve("/foo/bar", "baz"); // returns '/foo/bar/baz'
// const a3 = path.resolve("/foo/bar", "/baz"); // returns '/baz'
// const a4 = path.resolve("/foo/bar", "../baz"); // returns '/foo/baz'
// const a5 = path.resolve("home", "/foo/bar", "../baz"); // returns '/foo/baz'
// const a6 = path.resolve("home", "./foo/bar", "../baz"); // returns '/home/foo/baz'
// const a7 = path.resolve("home", "foo/bar", "../baz"); // returns '/home/foo/baz'
// const a8 = path.resolve(
//   "home",
//   "foo",
//   "build",
//   "aaaa",
//   "aadada",
//   "../../..",
//   "asset"
// ); //return '/home/foo/asset'

// console.log(a1);
// console.log(a2);
// console.log(a3);
// console.log(a4);
// console.log(a5);
// console.log(a6);
// console.log(a7);
// console.log(a8);
// console.log(a1, a2, a3, a4, a5, a6, a7, a8);

// console.log(__dirname);
// console.log(path.resolve(__dirname, `public`));
// // console.log(__filename);
// console.log(path.resolve(__dirname, `public/images`));
// console.log(path.resolve(__dirname, `./public/images`));
console.log(path.resolve(__dirname, `../public/images`));
console.log(path.resolve(__dirname, `..`, `public/images`));
console.log(path.resolve(__dirname, `..`, `./public/images`));
console.log(path.resolve(__dirname, `..`, `/public/images`));
