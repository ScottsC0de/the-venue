// Spotify Web API
// Docs/Endpoints: https://developer.spotify.com/documentation/web-api/reference/#/
// Console: https://developer.spotify.com/console/
// https://github.com/awicks44/JavaScript-SpotifyAPI

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
// convert to jQuery
// project broken into: Models, Views, Controllers

// Post request, client id and secret passed in body
// spotify returns a bearer token used to call all their endpoints

// source: https://www.youtube.com/watch?v=0dmS0He_czs
// source: https://www.youtube.com/watch?v=SbelQW2JaDQ&t=417s

// init spotify token as global variable
// used for every api call
let token;

window.addEventListener('load', async function (e) {
    const result = await fetch('http://localhost:3001/api/token');
    const data = await result.json();
    token = data.token;
});

// search for artist based on input
// get the id from the value
// add as argument
// weather app algo

const _searchArtist = async (artistName) => {

    const result = await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=artist`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data.artists.items[0].id;

};

const _searchSong = async (songName) => {

    const result = await fetch(`https://api.spotify.com/v1/search?q=${songName}&type=track&limit=1`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    console.log(data);
    return data;

};

const _getArtistTopTracks = async (id) => {

    const result = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=us`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    console.log(data);
    return data;
};

// const trackEndPoint = 'https://api.spotify.com/v1/tracks/' // probably dont need this

const _getTrack = async (id) => {

    const result = await fetch(`https://api.spotify.com/v1/tracks/${id}/?limit=${limit}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data;
};

const _getPlaylist = async (playlist_id) => {

    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data;
};

const _createPlaylist = async (user_id) => {

    const result = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data;
};

const _addToPlaylist = async (playlist_id) => {

    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data;
};

const _removeFromPlaylist = async (playlist_id) => {

    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data;
};

// })(); // gets called immediately

// using api data in our ui
// const uiController = (() => {
/* 
 
Record Shopping section
 
<h1>Record Store</h1>
<p>Search an artist, song name, or Spotify playlist</p>

<select name="choose-search" id="choose-search">
<option value="artist-option">Artist</option>
<option value="song-option">Song</option>
<option value="playlist-option">Playlist</option>
</select>

<section id="artist-section">
<form action="">
<label for="">Enter Artist Here:</label><br>
<p>They're top tracks should come up...</p>
<input id="search-artist" type="text" placeholder="The Beatles"><br>
<button id="artist-btn">Get Top Tracks</button><br>
<div id="artist-search-results">
<h3>Track List:</h3>
  <img src="" alt="Image of the searched artist" id="artist-img" width="300" height="200">
    <h3>Top Tracks:</h3>
    <div id="track-list"></div>
    <button class="clear-btn" onclick="clearResults()">Clear</button><br>
</div>
</form>
</section>

<section id="song-section">
<form action="">
<label for="">Enter Song Here:</label><br>
<p>It should come up...</p>
<input id="search-song" type="text" placeholder="Come Together"><br>
<button id="song-btn">Get Song</button><br>
<div id="track-list">
<h3>Track List:</h3>
  <img src="" alt="Searched song album cover" id="song-img" width="300" height="200">
  <p>Name: </p>
  <p>Artist: </p>
  <p>Album: </p>
  <p>Year: </p>
  <p>Record Label: </p>
  <button class="clear-btn" onclick="clearResults()">Clear</button><br>
</div>
</form>
</section>

<section id="playlist-section">
<form action="">
<label for="">Enter Spotify Playlist Here:</label><br>
<p>It should come up...</p>
<input id="search-playlist" type="text" placeholder="70s Dad Rock"><br>
<button id="search-playlist-btn">Get Playlist</button><br>
<div id="playlist-results">
 <h3>Track List:</h3>
  <img src="" alt="Playlist cover" id="playlist-img" width="300" height="200">
  <p>Playlist Name: </p>
  <p>Creator: </p>
  <button class="clear-btn" onclick="clearResults()">Clear</button><br>
</div>
</form>

<h3>Create Your Own Spotify Playlist Here:</h3>
<button id="create-playlist-btn"></button>
</section>
 
*/

// search an artist
var artistSection = document.getElementById('artist-section'); // artist section container
var searchArtistInput = document.getElementById('search-artist'); // artist search input field
var artistBtn = document.getElementById('artist-btn'); // search artist button
var artistResultsDiv = document.getElementById('artist-search-results'); // results of the button click
var artistImg = document.getElementById('artist-img'); // img of artist to appear above songs

// search a song
var songSection = document.getElementById('song-section'); // song search container
var searchSongInput = document.getElementById('search-song'); // song search input field
var songBtn = document.getElementById('song-btn'); // search song button
var songImg = document.getElementById('song-img'); // album image of searched song
var trackList = document.getElementById('track-list'); // area where tracks will appear

// search a playlist
var playlistSection = document.getElementById('playlist-section'); // playlist search section
var searchPlaylist = document.getElementById('search-playlist'); // search a playlist input field
var searchPlaylistBtn = document.getElementById('search-playlist-btn'); // search a playlist button
var searchPlaylistImg = document.getElementById('playlist-img'); // search a playlist button
var playlistResultsDiv = document.getElementById('playlist-results'); // search a playlist button

// create a playlist and add or remove songs (buttons)
var createPlaylist = document.getElementById('create-playlist-btn'); // create playlist
var addSongToPlaylist = document.getElementById('add-song'); // add song to playlist
var removeFromPlaylist = document.getElementById('remove-song'); // remove song from playlist
var clearBtns = document.querySelectorAll('clear-btn'); // clear buttons

// one token makes all API calls
var apiToken = document.getElementById('api-token'); // spotify api token

// search artist button
artistBtn.addEventListener('click', async function (e) {
    e.preventDefault();

    const artistId = await _searchArtist(searchArtistInput.value);
    const getTheTracks = await _getArtistTopTracks(artistId);

    // artistResultsDiv.textContent = artistSearched; // data displayed
});

// search song button
songBtn.addEventListener('click', async function (e) {
    e.preventDefault();

    const songsSearched = await _searchSong(searchSongInput.value);

    // trackList.textContent = songsSearched; // data displayed
});

// search playlist button
searchPlaylistBtn.addEventListener('click', function (e) {
    e.preventDefault();

    getPlaylist();

    var playlistSearched = response.user.playlist; // playlist value from function
    playlistResultsDiv.textContent = playlistSearched; // data displayed
});

// create a new playlist button
createPlaylistBtn.addEventListener('click', function (e) {
    e.preventDefault();

    createPlaylist();
});

// add this song to your playlist button
addSongToPlaylist.addEventListener('click', function (e) {
    e.preventDefault();

    addSongToPlaylist();
});

// remove this song from your playlist button
removeFromPlaylist.addEventListener('click', function (e) {
    e.preventDefault();

    removeFromPlaylist();
});

// if statement for select options
var selectSearch = document.getElementById('choose-search');
// switch statement, option displays search form

// public methods
// return {

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
// }

// })();

// connecting ui and api
// const appController = ((uiCtrl, apiCtrl) => {

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

// })(uiController, apiController);

// will need to call a method to load the genres on page load
// appController.init();

