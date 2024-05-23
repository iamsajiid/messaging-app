import express from "express";
import { getUsersMessaged } from "../controllers/users.js";

const router = express.Router();

router.route("/sidebar").get(getUsersMessaged);

export default router