import express from "express";

import { login, signup,sendOtp,authenticate,checkoutSession,paymentVerfication } from "../controllers/auth.js";
import { getAllUsers, updateProfile,getUserPlan } from "../controllers/users.js";
import auth from "../middleware/auth.js";
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/sendOtp", sendOtp);
router.post("/authenticate", authenticate);
router.post("/checkout-session", checkoutSession);
router.post("/payment-Verfication/:userId/:plan", paymentVerfication);
router.get("/getUserPlan/:id",getUserPlan)
router.get("/getAllUsers", getAllUsers);
router.patch("/update/:id", auth, updateProfile);

export default router;
