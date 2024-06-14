const express = require("express");

const sessions = require("express-session");

const app = express();

const username_DB = "张三";
const password_DB = "admin123";
let sessionDB = null;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 解决跨域
app.use("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader("Access-Control-Allow-Headers", "*"),
    res.setHeader("Access-Control-Allow-Methods", "*"),
    next();
});

app.use(
  sessions({
    secret: "admin123",
    name: "ZhangSan",
    cookie: {
      maxAge: 60000,
    },
    resave: false,
  })
);

//
app.get("/", (req, res) => {
  res.contentType = "text/html";
  res.sendFile("./index.html", { root: __dirname });
  return;
});

// 提交表单
app.post("/login", (req, res) => {
  if (req.body.username === username_DB && req.body.password === password_DB) {
    sessionDB = req.session;
    sessionDB.username = req.body.username;
    res.send(`用户名密码正确，session下发成功`);
  } else {
    res.send("用户名或密码错误");
  }
});
// 退出登录
app.get("/logout", (req, res) => {
  req.session.destroy();
});

app.listen(3888, () => {
  console.log("服务已经启动");
});
