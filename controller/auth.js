const User = require("../models/user");

exports.getLoginPage = (req, res, next) => {
  res.render("auth/login", { pageTitle: "Login" });
};

exports.login = (req, res, next) => {
  User.findById("5db167aa85c99f4d390fd76d")
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect("/");
    })
    .catch(err => {
      console.log("ERR: Could Not Login, " + err);
    });
};

exports.logout = (req, res, next) => {
  req.session.destroy(err => {
    res.redirect("/login");
  });
};
