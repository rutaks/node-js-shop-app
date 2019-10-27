const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLoginPage = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    errorMessage: req.flash("error")
  });
};

exports.getSignupPage = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    errorMessage: req.flash("error")
  });
};

exports.signup = (req, res, next) => {
  const { email, names, password, confirmPassword } = req.body;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash("error", "Email is used by another user");
        return res.redirect("signup");
      }
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
      if (!user) {
        req.flash("error", "Invalid email or password");
        res.redirect("/login");
      }
      bcrypt.compare(password, user.password).then(matches => {
        if (matches) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          res.redirect("/");
        }
        req.flash("error", "Invalid email or password");
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
