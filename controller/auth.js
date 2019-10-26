const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLoginPage = (req, res, next) => {
  res.render("auth/login", { pageTitle: "Login" });
};

exports.getSignupPage = (req, res, next) => {
  res.render("auth/signup", { pageTitle: "Signup" });
};

exports.signup = (req, res, next) => {
  const { email, names, password, confirmPassword } = req.body;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) return res.redirect("signup");
      return bcrypt.hash(password, 12).then(hashedPassword => {
        const user = new User({
          email: email,
          names: names,
          password: hashedPassword,
          cart: { items: [] }
        });
        return user.save();
      });
    })
    .then(result => {
      return res.redirect("/login");
    })
    .catch(err => console.log("ERR: Could not signup user, " + user));
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (!user) res.redirect("/login");
      bcrypt.compare(password, user.password).then(matches => {
        if (matches) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          res.redirect("/");
        }
        res.redirect("/login");
      });
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
