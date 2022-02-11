const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const makeAuth = require('../../utils/auth');

router.get('/', makeAuth, async (req,res) => {
    try {
        const blogsData = await Blog.findAll({
            include: [
                {
                model: User,
                attributes: ['name', 'id', ],
                },
            ],
        });
        const blogs = blogsData.map((blog) => blog.get({ plain: true}));
        console.log(blogs);
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});