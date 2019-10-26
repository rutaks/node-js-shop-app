const router = require("express").Router();
const authController = require("../controller/auth");

router.get("/login", authController.getLoginPage);

router.post("/login", authController.login);

module.exports = router;
