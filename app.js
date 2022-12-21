require('dotenv').config();
// Spotify Web API



// The Venue - title
// Security Check - login page. are users logging into our site or spotify
// Cover Charge - button to confirm. you will need a spotify for this site
// Log in to your Spotify
// if user does not have spotify we link them to create page
// Main Stage - user content to be posted
// BackStage - user's playlists, songs, etc
// The Bar - sidebar
// The Crowd - comment section of the playlist
// like button to add to your spotify account
// Groupie - account name

// Future Updates:
// VIP subscription

// project broken into: Models, Views, Controllers

// Get a token from spotify used for calling Future API endpoints

// First code block: Overall API functionality
// Post request, client id and secret passed in body
// spotify returns a bearer token used to call all their endpoints

// source: https://www.youtube.com/watch?v=0dmS0He_czs
const apiController = () => {
    const clientId = process.env.spotifyClientId;
    const clientSecret = process.env.clientSecret;

    const getToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${btoa(clientId, clientSecret)}` // btoa takes JS strings as params, base-64
            },
            body: 'grant_type=client_credentials'
        });

        // spotify token
        const data = await result.json();
        return data.access_token;
    }
};

// const getTracks = () => {}
// const addToPlaylist = () => {}
// const removeFromPlaylist = () => {}
// const createPlaylist = () => {}
