const router = require("express").Router();
const authController = require("../controller/auth");

router.get("/login", authController.getLoginPage);

module.exports = router;
