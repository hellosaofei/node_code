import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    message: "请求了根路由",
  });
});

export default router;
