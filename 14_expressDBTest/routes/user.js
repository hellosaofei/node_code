import express from "express";
import { queryAllUser } from "../controllers/user.js";
// import { queryAllUser } from "../controllers/user";
const router = express.Router();

router.get("/", queryAllUser);

export default router;
