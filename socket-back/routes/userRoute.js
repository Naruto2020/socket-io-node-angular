const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const {checkUser, requireAuth} = require("../midlleware/authMidlleware");

// sing up
router.post("/register", authController.singUp);

// sing in 
router.post("/login", authController.singIn);

module.exports = router;