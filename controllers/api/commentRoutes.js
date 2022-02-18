const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const makeAuth = require('../../utils/auth');

router.post('/', makeAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.comment,
      blog_id: parseInt(req.body.blogId),
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});
  
module.exports = router;