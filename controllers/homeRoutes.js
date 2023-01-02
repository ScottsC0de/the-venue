const router = require('express').Router();
// const { Post, User, Comment, Playlist } = require('../models');
const withAuth = require('../utils/auth');

router.get('/spotify', async (req, res) => {
    res.render('spotifyapi', {})
});


// more code needs to be added

module.exports = router;

