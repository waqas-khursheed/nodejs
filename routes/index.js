import express from "express";
import authRoutes from "./auth.routes.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

// Auth routes
router.use("/auth", authRoutes);

// Admin dashboard route (only for ADMIN role)
router.get(
  "/admin/dashboard",
  authMiddleware,
  roleMiddleware("ADMIN"),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

// User profile route (any logged-in user)
router.get("/user/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome User" });
});

export default router;