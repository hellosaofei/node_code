const express = require("express");
const jwt = require("jsonwebtoken");

// 生层 express 实例
const app = express();
// 服务器秘钥，用于加密 token
const jwtKey = "sjpachiapjdpajdopjaida";
// 存放在数据库中的用户信息
const database = {
  username: "张三",
  password: "admin123",
};
// 用于解析请求体
app.use(
  express.urlencoded({
    limit: "1024kb",
  })
);
app.use(express.json());
// 解决跨域问题
app.use("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username == database.username && password == database.password) {
    jwt.sign({ username }, jwtKey, { expiresIn: "30s" }, (err, token) => {
      res.json({
        username,
        message: "登陆成功",
        token,
      });
    });
  }
});
app.post("/afterlogin", (req, res) => {
  const headers = req.headers;
  // authorization:Bearer 【token值】
  const token = headers["authorization"].split(" ")[1];
  jwt.verify(token, jwtKey, (err, payload) => {
    if (err) {
      console.error(err);
    }
    res.json({ message: "认证成功", payload });
  });
});

app.listen(3001, () => {
  console.log("服务已经启动");
});
