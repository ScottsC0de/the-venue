const router = require('express').Router();
const axios = require('axios');
// const userRoutes = require('./userRoutes');
// const playlistRoutes = require('./playlistRoutes');
// const commentRoutes = require('./commentRoutes');

require('dotenv').config();
const btoa = require('btoa');

// Get a token from spotify used for calling Future API endpoints
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const _getToken = async () => {

    const result = await axios.post('https://accounts.spotify.com/api/token', { grant_type: "client_credentials" }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret) // btoa takes JS strings as params, base-64
        }
    });

    // spotify token
    console.log(result);
    return result.data.access_token;

};

// token route
router.get('/token', async (req, res) => {
    const token = await _getToken();
    res.json({ token })
});

// router.use('/users', userRoutes);
// router.use('/posts', postRoutes);
// router.use('/comments', commentRoutes);
// router.use('/playlist', playlistRoutes);

module.exports = router;

