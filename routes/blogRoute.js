const express = require("express");
const verifyJWT = require("../middleware/jwt");
const Blog = require("../schema/blogSchema");

const blogRoute = express.Router();

blogRoute.get("/:username", jwt.authenticateToken, (req, res) => {
  let username = req.params.username;

  Blog.find({ username: username }, (err, blog) => {
    if (err) {
      res.status(400).json({ message: err.message });
    }
    res.status(200).json({ message: blog });
  });
});

blogRoute.post("/:username", jwt.authenticateToken, (req, res) => {
  let username = req.params.username;
  let blogPost = req.body;
  blogPost.created_by = username;
  blogPost.created_at = Date.now();

  Blog.create(blogPost, (err, blog) => {
    if (err) {
      res.status(400).json({ message: err.message });
    }
    res.status(200).json({ message: blog });
  });
});

blogRoute.get("/:id", jwt.authenticateToken, (req, res) => {
  // get specific Blog
  let id = req.params.id;
  Blog.findById(id, (err, blog) => {
    if (err) {
      res.status(400).json({ message: err.message });
    }
    res.status(200).json({ message: blog });
  });
});

blogRoute.put("/:id", jwt.authenticateToken, (req, res) => {
  // update specific Blog
  let id = req.params.id;
  Blog.findByIdAndUpdate(id, newBlog, (err, blog) => {
    if (err) {
      res.status(404).json({ message: err.message });
    }
    res.status(200).json({ message: blog });
  });
});

blogRoute.delete("/:id", verifyJWT, (req, res) => {
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
