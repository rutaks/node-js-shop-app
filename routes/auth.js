const router = require("express").Router();
const authController = require("../controller/auth");
const isAuth = require("../middleware/is-auth");

router.get("/login", authController.getLoginPage);

router.post("/login", authController.login);

router.get("/signup", authController.getSignupPage);

router.post("/signup", authController.signup);

router.get("/logout", isAuth, authController.logout);

module.exports = router;
