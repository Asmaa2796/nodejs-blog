const express = require("express");
const mongoose = require("mongoose");
// express app
const app = express();
require("dotenv").config();

// Now you can use the environment variables
const port = process.env.PORT || 3000;
const dbUri = process.env.MONGO_URI;

console.log(`App is running on port ${port}`);
// connect mongodb
mongoose
  .connect(dbUri)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// ##########
const blogRoutes = require("./routes/blogRoutes");
const expressLayouts = require("express-ejs-layouts");
// use view engine
app.set("view engine", "ejs");
app.use(express.static("public"));
// passing data from a form to request
app.use(express.urlencoded());
// for global layout
app.use(expressLayouts);
app.set("layout", "layout");

// method override PUT | POST
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// routes
app.get("/", (req, res) => {
  // ## send organizes status too 200 or 500,etc
  // res.send('<b>Success!</b>')

  // ## ex: for view file with html file
  // res.sendFile('./views/index.html',{root:__dirname});

  // ## for view file with ejs file
  res.render("index", { title: "Home" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About us" });
});

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.use(blogRoutes);
// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "Oops 404" });
});
