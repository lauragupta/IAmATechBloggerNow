const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const makeAuth = require('../../utils/auth');

router.post('/', makeAuth, async (req, res) => {
    try {
      const newBlog = await Blog.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newBlog);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.put('/:id', makeAuth, async (req, res) => {
    try {
      const updateBlog = await Blog.update({
        ...req.body,
      },
      {where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
      });
  
      res.status(200).json(updateBlog);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.delete('/:id', makeAuth, async (req, res) => {
    try {
      const blogData = await Blog.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
      if (!blogData) {
        res.status(404).json({ message: 'No blog found with this id!' });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;