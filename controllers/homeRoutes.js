const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');
const makeAuth = require('../utils/auth');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
    try {
        const blogsData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name', 'id' ],
                },
            ],
        });
        const blogs = blogsData.map((blog) => blog.get({ plain: true}));
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blogs/:id', async (req, res) => {
    try {
        const blogsData = await Blog.findOne({
            include: [
                {
                    model: User,
                    attributes: ['name', 'id' ],
                },
            ],
            where: {
                id: {
                    [Op.eq]: req.params.id,
                },
            },
        });
        const blog = blogsData.get({ plain: true});
        const commentsData = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name', 'id' ],
                },
            ],
            where: {
                blog_id: {
                    [Op.eq]: req.params.id,
                },
            },
        });
        const comments = commentsData.map((comment) =>
            comment.get({ plain: true })
            );
        
        res.render('singleBlog', {
            blog,
            comments,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
        
    }
});

router.get('/dashboard', makeAuth,  async (req, res) => {
    try {
        const blogsData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name', 'id' ],
                },
            ],
            where: {
                user_id: {
                    [Op.eq]: req.session.user_id,
                },
            },
        });
        const blogs = blogsData.map((blog) =>
            blog.get({ plain: true })
            );
        
        const userData = await User.findOne({
            attributes: {exclude: ['password'] },
            where: {
                id: {
                    [Op.eq]: req.session.user_id,
                },
            },
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            blogs, 
            user,
            logged_in: req.session.logged_in 
        });
        // res.prependOnceListener("blog", {
        //     blogs, 
        //     logged_in: req.session.user_id,
        // });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/dashboard/:id', async (req, res) => {
    try {
        const blogsData = await Blog.findOne({
            include: [
                {
                    model: User,
                    attributes: ['name', 'id' ],
                },
            ],
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
                },
        });
        const blog = blogsData.get({ plain: true});
        const commentsData = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name', 'id' ],
                },
            ],
            where: {
                blog_id: {
                    [Op.eq]: req.params.id,
                },
            },
        });
        const comments = commentsData.map((comment) =>
            comment.get({ plain: true })
            );
        
        res.render('update', {
            blog,
            comments,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
        
    }
});


router.get('/login', async (req, res) => {
    //If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('dashboard');
        return;
    }
    res.render('login');
});

module.exports = router;