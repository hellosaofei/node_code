import express from "express";

import Animal from "./app.js";
const animal = new Animal();

const app = express();

animal.sayName();

app.listen(3300, () => {
  console.log("express服务已经启动");
});
