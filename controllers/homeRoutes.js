const router = require('express').Router();
const { Blog } = require('../models');

router.get('/', async (req,res) => {
    const blogsData = await Blog.findAll();
    const blogs = blogsData.map((blog) => blog.get({ plain: true}));
    console.log(blogs);
    res.render('homepage', {
        blogs,
    });
});

module.exports = router;