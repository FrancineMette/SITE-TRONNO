// adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/registro", adminController.registrarAdmin);

module.exports = router;
