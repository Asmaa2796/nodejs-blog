// crud operations of blog
const Blog = require("../models/blog");

const blog_create = (req, res) => {
  res.render("blog/createBlog", { title: "New blog" });
};
const blog_view = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/all_blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};
const blog_update = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("blog/editBlog", { title: "Update blog", blog: result });
    })
    .catch((err) => console.log(err));
};
const blog_to_update = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndUpdate(id, req.body, {
    new: true,
  })
    .then((result) => {
      res.redirect("/all_blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};
const blog_get_all = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blog/blogs", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};
const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("blog/blogDetails", { title: "Blog Details", blog: result });
    })
    .catch((err) => {
      res.render("404", { title: "Blog Not Found" });
    });
};
const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/all_blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blog_view,
  blog_create,
  blog_update,
  blog_to_update,
  blog_get_all,
  blog_details,
  blog_delete,
};
