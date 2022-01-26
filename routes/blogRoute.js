const express = require("express");
const jwt = require("../middleware/jwt");
const Blog = require("../schema/blogSchema");

const blogRoute = express.Router();

blogRoute.get("/", jwt.verifyJWT, (req, res) => {
  Blog.find({ private: false }, (err, blogs) => {
    if (err) {
      res.status(400).json({ message: err.message });
    }
    res.status(200).json({ message: blogs });
  });
});

blogRoute.post("/:username", jwt.verifyJWT, (req, res) => {
  let newBlogPost = {
    created_by: req.params.username,
    created_at: Date.now(),
    blog_title: req.body.title,
    blog_content: req.body.content,
    private: req.body.private,
  };

  Blog.create(newBlogPost, (err, blog) => {
    if (err) {
      res.status(400).json({ message: err.message });
    }
    res.status(200).json({ message: blog });
  });
});

blogRoute.get("/:id", jwt.verifyJWT, (req, res) => {
  // get specific Blog
  let id = req.params.id;
  Blog.findById(id, (err, blog) => {
    if (err) {
      res.status(400).json({ message: err.message });
    }
    res.status(200).json({ message: blog });
  });
});

blogRoute.put("/:id", jwt.verifyJWT, (req, res) => {
  // update specific Blog
  let id = req.params.id;
  let newBlog = req.body;
  Blog.findByIdAndUpdate(id, newBlog, (err, blog) => {
    if (err) {
      res.status(404).json({ message: err.message });
    }
    res.status(200).json({ message: blog });
  });
});

blogRoute.delete("/:id", jwt.verifyJWT, (req, res) => {
  let id = req.params.id;
  // delete specific blog
  Blog.findByIdAndDelete(id, (err) => {
    if (err) {
      res.status(404).json({ message: err.message });
    }
    res.status(204).json({ message: "DELETED" });
  });
});

module.exports = blogRoute;
