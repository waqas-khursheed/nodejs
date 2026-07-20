import express from "express";
import { getPublicWebSetting } from "../controllers/user.webSetting.controller.js";

const router = express.Router();

router.get("/", getPublicWebSetting);

export default router;
