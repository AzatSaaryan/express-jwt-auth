const User = require("../models/User");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const errorHandler = (err) => {
  console.log(err.message, err.code);

  let error = { email: "", password: "" };

  if (err.message === "Incorrect email") {
    error.email = "that email is not registered";
  }

  if (err.message === "Incorrect password") {
    error.password = "that password is incorrect";
  }
  if (err.code === 11000) {
    error.email = "That email is already registered";
    return error;
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }
  return error;
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, SECRET_KEY, {
    expiresIn: maxAge,
  });
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};
module.exports.login_get = (req, res) => {
  res.render("login");
};
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email: email, password: password });
    await user.save();
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    return res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(400).json({ errors });
  }
};
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (error) {
    if (!res.headersSent) {
      const errors = errorHandler(error);
      res.status(400).json({ errors });
    }
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/api/login");
};
