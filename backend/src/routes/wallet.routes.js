import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getWallet,
  deposit,
  bet,
  win,
  history
} from "../controllers/wallet.controller.js";

const router = express.Router();

router.get("/", protect, getWallet);
router.post("/deposit", protect, deposit);
router.post("/bet", protect, bet);
router.post("/win", protect, win);
router.get("/history", protect, history);

export default router;
