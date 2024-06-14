import express from "express";
// import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

// 导入路由文件
import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";

const app = express();
// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.resolve(__dirname, "public")));

// 路由汇总
app.use("/", indexRouter);
app.use("/user", userRouter);

app.listen("8082", () => {
  console.log("服务启动成功！！！！");
});
