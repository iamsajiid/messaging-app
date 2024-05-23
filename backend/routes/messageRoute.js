import express from "express";
import { getMessages, sendMessage } from "../controllers/messaging.js";

const router = express.Router();

router.route("/:id").get(getMessages);
router.route("/send/:id").post(sendMessage);

export default router;