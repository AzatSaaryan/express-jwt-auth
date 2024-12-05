const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = function (req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        return res.redirect("/api/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    return res.redirect("/api/login");
  }
};

const checkUser = function (req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        try {
          let user = await User.findOne({ _id: decodedToken.id });
          res.locals.user = user;
        } catch (error) {
          console.log(error.message);
          res.locals.user = null;
        }

        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
