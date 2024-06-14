/**
 * 该文件未进行结构拆分，能够独立完成数据库连接、查询操作
 */
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const db = mysql.createPool({
  host: "8.142.149.99",
  user: "boblog",
  password: "r4JxBXfrcJHMDDrS",
  database: "boblog",
  timezone: "08:00",
});
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/getAdmin", (req, res) => {
  db.query("select * from admin", (err, result) => {
    if (err) {
      result = {
        warn: "error",
        message: "获取数据库时发生错误",
      };
      res.send(JSON.stringify(result));
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

app.get("/getComment", (req, res) => {
  db.query("select * from comment", (err, result) => {
    if (err) {
      result = {
        warn: "error",
        message: "获取数据库时发生错误",
      };
      res.send(JSON.stringify(result));
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

app.listen("8082", () => {
  console.log("服务器已经启动!!!");
});
