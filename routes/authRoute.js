import express from "express";

import jwt from "jsonwebtoken";
import passport from "passport";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  createAddressController,
  getAllAddressesController,
  getSingleAddressController,
  updateAddressController,
  defaultAddressController,
  verifyEmail,
  getOwnDetails,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);
router.get("/me", requireSignIn, getOwnDetails);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

// address
router.post("/user-address", requireSignIn, createAddressController);
router.get("/default-address", requireSignIn, defaultAddressController);
router.get("/all-addresses", requireSignIn, getAllAddressesController);
router.get("/address/:id", requireSignIn, getSingleAddressController);
router.put("/update-address/:id", requireSignIn, updateAddressController);


//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

router.get('/verify-email', verifyEmail);

// 1. Start Google login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// 2. Google redirects here after login
router.get("/google/callback", passport.authenticate("google", {
  failureRedirect: "/login", session: false
}), (req, res) => {
  // Generate token and redirect to frontend
  const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  // You can encode user data in query params or just token
  res.redirect(`http://localhost:3000/google-auth-success?token=${token}`);
});

export default router;
