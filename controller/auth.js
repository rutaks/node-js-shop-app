exports.getLoginPage = (req, res, next) => {
  res.render("auth/login", { pageTitle: "Login" });
};
