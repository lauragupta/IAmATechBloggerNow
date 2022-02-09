const router = require('express').Router();
const { Blog, User } = require('../models');

router.get('/', (req,res) => {
    res.render('homepage');
});