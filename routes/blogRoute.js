const express = require("express");
const verifyJWT = require("../middleware/jwt");
const Blog = require("../schema/blogSchema");

const blogRoute = express.Router();

blogRoute.get("/:username", verifyJWT, (req, res) => {
  let username = req.params.username;

  Blog.find({ username: username }, (err, blogs) => {
    if (err) {
      res.status(400).json({ message: err.message });
    }
    res.status(200).json({ message: blogs });
  });
});

blogRoute.post("/:username", verifyJWT, (req, res) => {
  let username = req.params.username;
  let blogPost = req.body;
  blogPost.created_by = username;
  blogPost.created_at = Date.now();

  Blog.create(blogPost, (err, blog) => {
    if (err) {
      res.status(400).json({ message: err.message });
    }
    res.status(200).json({ message: blogs });
  });
});

blogRoute.get("/:id", verifyJWT, (req, res) => {
  // get specific Blog
  let id = req.params.id;
  Blog.findById(id, (err, blog) => {
    if (err) {
      res.status(400).json({ message: err.message });
    }
    res.status(200).json({ message: blogs });
  });
});

blogRoute.put("/:id", verifyJWT, (req, res) => {
  // update specific Blog
  let id = req.params.id;
  Blog.findByIdAndUpdate(id, newBlog, (err, blog) => {
    if (err) {
      res.status(404).json({ message: err.message });
    }
    res.status(200).json({ message: blogs });
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
