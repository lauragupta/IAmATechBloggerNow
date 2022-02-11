const router = require('express').Router();
const { User, Blog } = require('../models');
const makeAuth = require('../utils/auth');

router.get('/', async (req,res) => {
    try {
        const blogsData = await Blog.findAll({
            include: [
                {
                model: User,
                attributes: ['name'],
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


router.get('/login', async (req, res) => {
    //If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    } else {
     res.render('login');
    }
});

module.exports = router;