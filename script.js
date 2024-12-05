const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const MongoUri = process.env.MONGO_URI;
const authRoutes = require("./routes/authRoutes");
const path = require("path");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.set("views", path.join(__dirname, "views/partials"));

async function connectToMongo() {
  try {
    await mongoose.connect(MongoUri);
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error while connecting to Mongo", error);
  }
}

app.get("*", checkUser);

app.get("/", (req, res) => {
  res.render("main.ejs");
});

app.get("/api/books", requireAuth, (req, res) => {
  res.render("books");
});

app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  connectToMongo();
});
