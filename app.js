require('dotenv').config();

// Now you can use the environment variables
const port = process.env.PORT || 3000;
const dbUri = process.env.MONGO_URI;

console.log(`App is running on port ${port}`);
// ##########
const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// express app
const app = express();

// connect mongodb

mongoose
  .connect(dbUri)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// use view engine
app.set("view engine", "ejs");
app.use(express.static("public"));
// passing data from a form to request
app.use(express.urlencoded());

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

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


// ## blog routes
// new blog
app.get("/blog/create", (req, res) => {
    res.render("blog/createBlog", { title: "New blog" });
});
app.post('/all_blogs',(req,res) => {
    const blog = new Blog(req.body);
    blog.save()
    .then((result) => {
        res.redirect("/all_blogs");
    })
    .catch((err) => {
        console.log(err);
    });
});
// update blog
app.get("/blog/update/:id", (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => {
        res.render("blog/editBlog", { title: "Update blog" ,blog:result});
    })
    .catch((err) => console.log(err));
});
app.put('/blog/update/:id',(req,res) => {
    const id = req.params.id;
    Blog.findByIdAndUpdate(id,req.body,{
        new : true
    })
    .then((result) => {
        res.redirect("/all_blogs");
    })
    .catch((err) => {
        console.log(err);
    });
});
// get all blogs
app.get("/all_blogs", (req, res) => {
  Blog.find().sort({createdAt:-1})
    .then((result) => {
      res.render("blog/blogs", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
// single record | blog details
app.get("/blogDetails/:id", (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then((result) => {
        res.render("blog/blogDetails", { title: "Blog Details",blog:result});
      })
      .catch((err) => {
        console.log(err);
      });
  });
// delete record | blog delete
app.delete("/blogDetails/:id", (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
      .then((result) => {
        res.json({redirect:'/all_blogs'});
      })
      .catch((err) => {
        console.log(err);
      });
  });

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "Oops 404" });
});
