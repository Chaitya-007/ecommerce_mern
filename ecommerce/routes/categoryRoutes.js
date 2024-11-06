import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createCategoryController } from "../controllers/categoryControllers.js";

const router = express.Router();

// import controller methods
router.post(
  "create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

export default router;
