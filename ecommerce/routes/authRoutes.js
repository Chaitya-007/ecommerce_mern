import express from "express";

// router object
const router = express.Router();

// routing
// REGISTER || METHOD POST
router.post("/register", resgisterController);

export default router;
