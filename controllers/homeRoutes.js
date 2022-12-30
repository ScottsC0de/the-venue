const router = require('express').Router();
const { Post, User, Comment, Playlist } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try {
      // Get all posts and JOIN with user data
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('mainstage', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/blogpost/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User, 
            attributes: ['name'],
          },
          {
          model: Comment,
            attributes: ['id', 'content', 'date_created','post_id', 'user_id'],
          },
        ],
      });
  
      const post = postData.get({ plain: true });
  
      res.render('blogpost', {
        ...post,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  router.get('/blogpost/:id', async (req, res) => {
    try {
      const commentData = await Comment.findAll(req.params.id, {
        include: [
          {
            model: User, 
            attributes: ['name'],
          },
        ],
      });
  
      const comment = commentData.get({ plain: true });
  
      res.render('blogpost', {
        ...comment,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Update Route
  router.get('/blogpost/update/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User, 
            attributes: ['name'],
          },
          {
          model: Comment,
            attributes: ['id', 'content', 'date_created','post_id', 'user_id'],
          },
        ],
      });
  
      const post = postData.get({ plain: true });
  
      res.render('updatepost', {
        ...post,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Use withAuth middleware to prevent access to route
  router.get('/backstage', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('backstage', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/backstage');
      return;
    }
  
    res.render('login');
  });

module.exports = router;

