const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// @desc    Get all blogs
// @route   GET /api/blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get single blog by ID
// @route   GET /api/blogs/:id
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a new blog
// @route   POST /api/blogs
router.post('/', async (req, res) => {
    const { title, snippet, content, coverImage } = req.body;

    if (!title || !snippet || !content) {
        return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    try {
        const newBlog = await Blog.create({
            title,
            snippet,
            content,
            coverImage
        });
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;