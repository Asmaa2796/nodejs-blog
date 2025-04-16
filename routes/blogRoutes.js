const express = require("express");
const blogController = require("../controllers/blogController");
const route = express.Router();

// ## blog routes
// new blog
route.post("/all_blogs", blogController.blog_view);
route.get("/blog/create", blogController.blog_create);
// update blog
route.get("/blog/update/:id", blogController.blog_update);
route.put("/blog/update/:id", blogController.blog_to_update);
// get all blogs
route.get("/all_blogs", blogController.blog_get_all);
// single record | blog details
route.get("/blogDetails/:id", blogController.blog_details);
// delete record | blog delete
route.delete("/blogDetails/:id", blogController.blog_delete);

module.exports = route;
