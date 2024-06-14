/**
 * 该文件用于测试
 * 1. jwt.verify()函数的输出
 * 2. jwt.sign()和jwt.verify()函数是否能异步进行
 */
import jwt from "jsonwebtoken";

const Secret = "Hello";
const tokenTime = "1m";
const payload = {
  username: "张三",
  userID: "sapdihaiohodihpd",
};
/**
 * 下发token
 */
function setToken(payload = {}) {
  const token = jwt.sign(payload, Secret, {
    expiresIn: tokenTime,
  });
  console.log("下发的token值为：", token);
}
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuW8oOS4iSIsInVzZXJJRCI6InNhcGRpaGFpb2hvZGlocGQiLCJpYXQiOjE3MTc5MzI4MDgsImV4cCI6MTcxNzkzMjg2OH0.wutZ8xXx-eRrfDOiXpyP1lBrrwwafDIIYZ3egPGQVsM";

/**
 * 校验token
 */
function verifyToken(token) {
  jwt.verify(token, Secret, function (err, decoded) {
    if (err) {
      console.error("JWT验证失败:", err);
    } else {
      console.log("JWT验证成功:", decoded);
    }
  });
}
// 验证失败：
// TokenExpiredError: jwt expired
// 验证成功：
// {
//   username: '张三',
//   userID: 'sapdihaiohodihpd',
//   iat: 1717932623,
//   exp: 1717932683
// }

// setToken(payload);

verifyToken(token);
