import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCategoryController,
  deleteCategoryController,
} from "../controllers/categoryControllers.js";

const router = express.Router();

// create controller methods
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// update controller methods
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// get all
router.get("/get-category", categoryController);

// get one category
router.get("/single-category/:slug", singleCategoryController);

// delte category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
