const express = require('express');
const router = express.Router();
const BlogPost = require('../models/blogModel');

// Get all blog posts with pagination
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
  
    try {
      const posts = await BlogPost.find({})
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();
  
      const totalPosts = await BlogPost.countDocuments();
  
      res.json({
        posts,
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// Create a blog
router.post('/', async (req, res) => {
  const blog = new BlogPost({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  });

  try {
    const newblog = await blog.save();
    res.status(201).json(newblog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


  // Search for blog posts by title or content
router.get('/search', async (req, res) => {
    const query = req.query.q;
    try {
      const posts = await BlogPost.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { content: { $regex: query, $options: 'i' } }
        ]
      });
  
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  module.exports = router;
