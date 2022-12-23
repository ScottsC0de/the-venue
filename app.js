// Spotify Web API
// Docs/Endpoints: https://developer.spotify.com/documentation/web-api/reference/#/
// Console: https://developer.spotify.com/console/
// https://github.com/awicks44/JavaScript-SpotifyAPI

require('dotenv').config();

// The Venue - title
// Security Check - login page. are users logging into our site or spotify
// Cover Charge - button to confirm. you will need a spotify for this site
// Log in to your Spotify
// if user does not have spotify we link them to create page
// Main Stage - user content to be posted
// BackStage - user's playlists, songs, etc
// The Bar - sidebar

// The Crowd - comment section
// like button to add to your spotify account

// Groupie - account name

// Future Updates:
// VIP subscription
// all other spotify api endpoints

// project broken into: Models, Views, Controllers

// Get a token from spotify used for calling Future API endpoints

// First code block: Overall API functionality
// Post request, client id and secret passed in body
// spotify returns a bearer token used to call all their endpoints

// source: https://www.youtube.com/watch?v=0dmS0He_czs

// source: https://www.youtube.com/watch?v=SbelQW2JaDQ&t=417s

// getting spotify data via spotify api
const apiController = (() => {

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret) // btoa takes JS strings as params, base-64
            },
            body: 'grant_type=client_credentials'
        });

        // spotify token
        const data = await result.json();
        return data.access_token;

    };

    // create spotify api methods
    // _ for private methods

    const _getArtistTracks = async (token, id) => {

        const result = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        return data;
    };

    const _getTrack = async (token, trackEndPoint) => {

        const result = await fetch(`${trackEndPoint}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        return data;
    };

    const _getTracks = async (token, tracksEndPoint) => {

        const limit = 10;

        const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        return data.items;
    };

    const _getPlaylist = async (token, playlist_id) => {

        const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        return data.items;
    };

    const _createPlaylist = async (token, user_id) => {

        const result = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        return data.items;
    };

    const _addToPlaylist = async (token, playlist_id) => {

        const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        return data.items;
    };

    const _removeFromPlaylist = async (token, playlist_id) => {

        const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        return data.items;
    };

    return {
        getToken() {
            return _getToken();
        },
        getArtistTracks(token, id) { // artist route, get request
            return _getArtistTracks(token, id)
        },
        getTrack(token, trackEndPoint) {
            return _getTrack(token, trackEndPoint);
        },
        getTracks(token, tracksEndPoint) {
            return _getTracks(token, tracksEndPoint);
        },
        createPlaylist(token, user_id) {
            return _createPlaylist(token, user_id);
        },
        getPlaylist(token, playlist_id) {
            return _getPlaylist(token, playlist_id);
        },
        addToPlaylist(token, playlist_id) { // post
            return _addToPlaylist(token, playlist_id);
        },
        removeFromPlaylist(token, playlist_id) {
            return _removeFromPlaylist(token, playlist_id);
        }
    };

})(); // gets called immediately

// using api data in our ui
const uiController = (() => {

    // object of our html selectors
    // const domElements = {
    //     searchArtist: '#search_artist', // input field
    //     trackList: '.track-list', // search results, add button next to each
    //     searchSong: '#search_song', // input field
    //     artistImg: '#artist-image', // track image, song artist & album name
    //     goBtn: '#go_btn', // button to generate results
    //     createPlaylist: '#create_playlist', // button
    //     addSongToPlaylist: '#add_song', // button next to each song
    //     removeSongFromPlaylist: '#remove_song', // not sure yet
    //     searchPlaylist: '#search_playlist', // input field
    //     apiToken: '#api-token', // token from spotify api
    // }

    var searchArtist = document.getElementById('search-artist'); // artist search input field
    var artistBtn = document.getElementById('artist-btn'); // search artist button
    var artistImg = document.getElementById('artist-img'); // img of artist to appear above songs
    var trackList = document.getElementById('track-list'); // area where artist top tracks will appear
    var searchSong = document.getElementById('search-song'); // song search input field
    var songBtn = document.getElementById('song-btn'); // search song button
    var createPlaylist = document.getElementById('create-playlist'); // create playlist button
    var addSongToPlaylist = document.getElementById('add-song'); // button to add song to playlist
    var removeFromPlaylist = document.getElementById('remove-song'); // button to remove song from playlist
    var searchPlaylist = document.getElementById('search-playlist'); // search a playlist input field
    var playlistBtn = document.getElementById('playlist-btn'); // search a playlist button
    var apiToken = document.getElementById('api-token'); // spotify api token

    // search artist button
    searchArtist.addEventListener('click', function (e) {
        e.preventDefault();
    });

    // search song button
    searchSong.addEventListener('click', function (e) {
        e.preventDefault();
    });

    // create a new playlist button
    createPlaylist.addEventListener('click', function (e) {
        e.preventDefault();
    });

    // add this song to your playlist button
    addSongToPlaylist.addEventListener('click', function (e) {
        e.preventDefault();
    });

    // remove this song from your playlist button
    removeFromPlaylist.addEventListener('click', function (e) {
        e.preventDefault();
    });

    // public methods
    return {

        // method to get input fields
        // inputField() {
        //     return {
        //         artist: document.querySelector(domElements.searchArtist),
        //         image: document.querySelector(domElements.artistImg),
        //         song: document.querySelector(domElements.song),
        //         tracks: document.querySelector(domElements.trackList), // not sure if we need this yet
        //         gobutton: document.querySelector(domElements.goBtn)
        //     }
        // },

        // // need methods to create select list option
        // // instead of select list we're using an input search
        // searchArtistHtml(text, value) {
        //     const html = `<input value="${value}">${text}>`;
        //     document.querySelector(domElements.searchArtist).insertAdjacentHTML('beforeend', html);
        // },

        // createPlaylist(text, value) {
        //     const html = `<option value="${value}">${text}</option>`;
        //     document.querySelector(domElements.selectPlaylist).insertAdjacentHTML('beforeend', html);
        // },

        // // need method to create a track list group item 
        // createTrackList(id, name) {
        //     const html = `<a href="#" class="list-group-item list-group-item-action list-group-item-light" id="${id}">${name}</a>`;
        //     document.querySelector(domElements.trackList).insertAdjacentHTML('beforeend', html);
        // },

        // need method to create the song detail
        // createArtistImg(img, artist) {

        //     const artistImgDiv = document.querySelector(domElements.artistImg);

        //     // any time user clicks a new song, we need to clear out the song detail div
        //     artistImgDiv.innerHTML = '';

        //     const html =
        //         `
        //     <div class="row col-sm-12 px-0">
        //         <img src="${img}" alt="">        
        //     </div>
        //     <div class="row col-sm-12 px-0">
        //         <label for="artist" class="form-label col-sm-12">By ${artist}:</label>
        //     </div> 
        //     `;

        //     artistImgDiv.insertAdjacentHTML('beforeend', html)
        // },

        // resetTrackDetail() {
        //     this.inputField().image.innerHTML = '';
        // },

        // resetTracks() {
        //     this.inputField().tracks.innerHTML = '';
        //     this.resetTrackDetail();
        // },

        // resetPlaylist() {
        //     this.inputField().playlist.innerHTML = '';
        //     this.resetTracks();
        // },

        // storeToken(value) {
        //     document.querySelector(domElements.apiToken).value = value;
        // },

        // getStoredToken() {
        //     return {
        //         token: document.querySelector(domElements.apiToken).value
        //     }
        // }
    }

})();

// connecting ui and api
const appController = ((uiCtrl, apiCtrl) => {

    // // get input field object ref
    // const domInputs = uiCtrl.inputField();

    // // get genres on page load
    // const loadGenres = async () => {

    //     // get the token
    //     const token = await apiCtrl.getToken();

    //     // store the token onto the page
    //     uiCtrl.storeToken(token);

    //     // get the genres
    //     const genres = await apiCtrl.getGenres(token);

    //     // populate our genres select element
    //     genres.forEach(element => uiCtrl.searchArtistHtml(element.name, element.id));
    // }

    // // create genre change event listener
    // domInputs.artist.addEventListener('change', async () => {

    //     // reset the playlist
    //     uiCtrl.resetPlaylist();

    //     // get the token that's stored on the page
    //     const token = uiCtrl.getStoredToken().token;

    //     // get the genre select field
    //     const genreSelect = uiCtrl.inputField().artist;

    //     // get the genre id associated with the selected genre
    //     const genreId = genreSelect.options[genreSelect.selectedIndex].value;

    //     // ge the playlist based on a genre
    //     const playlist = await apiCtrl.getPlaylistByGenre(token, genreId);

    //     // create a playlist list item for every playlist returned
    //     playlist.forEach(p => uiCtrl.createPlaylist(p.name, p.tracks.href));
    // });


    // // create submit button click event listener
    // domInputs.gobutton.addEventListener('click', async (e) => {
    //     // prevent page reset
    //     e.preventDefault();

    //     // clear tracks
    //     uiCtrl.resetTracks();

    //     // get the token
    //     const token = uiCtrl.getStoredToken().token;

    //     // get the playlist field
    //     const playlistSelect = uiCtrl.inputField().playlist;

    //     // get track endpoint based on the selected playlist
    //     const tracksEndPoint = playlistSelect.options[playlistSelect.selectedIndex].value;

    //     // get the list of tracks
    //     const tracks = await apiCtrl.getTracks(token, tracksEndPoint);

    //     // create a track list item
    //     tracks.forEach(el => uiCtrl.createTrackList(el.track.href, el.track.name))

    // });

    // // create song selection click event listener
    // domInputs.tracks.addEventListener('click', async (e) => {
    //     // prevent page reset
    //     e.preventDefault();

    //     uiCtrl.resetTrackDetail();

    //     // get the token
    //     const token = uiCtrl.getStoredToken().token;

    //     // get the track endpoint
    //     const trackEndpoint = e.target.id;

    //     // get the track object
    //     const track = await apiCtrl.getTrack(token, trackEndpoint);

    //     // load the track details
    //     uiCtrl.createArtistImg(track.album.images[2].url, track.name, track.artists[0].name);
    // });

    // return {
    //     init() {
    //         console.log('App is starting');
    //     }
    // }

})(uiController, apiController);

// will need to call a method to load the genres on page load
appController.init();

