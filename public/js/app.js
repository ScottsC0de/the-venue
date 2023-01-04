// Spotify Web API
// Docs/Endpoints: https://developer.spotify.com/documentation/web-api/reference/#/
// Console: https://developer.spotify.com/console/

// The Venue - title
// Security Check - login page
// Cover Charge - button to confirm
// Main Stage - user content to be posted
// BackStage - user's playlists, songs, etc
// The Bar - sidebar
// The Crowd - comment section
// Groupie - account name

// Future Updates:
// VIP subscription
// all other spotify api endpoints
// convert to jQuery

// Post request, client id and secret passed in body
// spotify returns a bearer token used to call all their endpoints

// source: https://www.youtube.com/watch?v=0dmS0He_czs
// source: https://www.youtube.com/watch?v=SbelQW2JaDQ&t=417s

// test on http://localhost:3001/spotify in Chrome
// init spotify token as global variable
// used for every api call
let token;

window.addEventListener('load', async function (e) {
    const result = await fetch('http://localhost:3001/api/token');
    const data = await result.json();
    token = data.token;
});

const _searchArtist = async (artistName) => {

    const result = await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=artist`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data.artists.items[0].id;

};

const _searchSong = async (songName) => {

    const result = await fetch(`https://api.spotify.com/v1/search?q=${songName}&type=track&limit=10`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    console.log(data);
    return data;

};

const _searchSongForId = async (songName) => {

    const result = await fetch(`https://api.spotify.com/v1/search?q=${songName}&type=track&limit=10`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    console.log(data);
    return data.tracks.items[0].id;

};

const _searchPlaylist = async (playlistName) => {

    const result = await fetch(`https://api.spotify.com/v1/search?q=${playlistName}&type=playlist&limit=15`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    console.log(data);
    return data.playlists.items[0].id;

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

// search an artist
var searchArtistSection = document.getElementById('artist-section'); // artist section container
var searchArtistInput = document.getElementById('search-artist'); // artist search input field
var searchArtistBtn = document.getElementById('artist-btn'); // search artist button
var artistResultsDiv = document.getElementById('artist-search-results'); // div for artist iframe and buttons

// search a song
var searchSongSection = document.getElementById('song-section'); // song search container
var searchSongInput = document.getElementById('search-song'); // song search input field
var searchSongBtn = document.getElementById('song-btn'); // search song button
var trackList = document.getElementById('track-list'); // div for song iframe and buttons

// search a playlist
var searchPlaylistSection = document.getElementById('playlist-section'); // playlist search section
var searchPlaylistInput = document.getElementById('search-playlist'); // search a playlist input field
var searchPlaylistBtn = document.getElementById('search-playlist-btn'); // search a playlist button
var playlistResultsDiv = document.getElementById('playlist-results'); // iframe and button div

// clearResults()
var clearBtns = document.querySelectorAll('clear-btn'); // clear buttons

// iframe tags from html for spotify players
var artistPlayer = document.getElementById('artist-iframe');
var songPlayer = document.getElementById('song-iframe');
var playlistPlayer = document.getElementById('playlist-iframe');

// one spotify api token makes all API calls
var apiToken = document.getElementById('api-token');

// search artist button
searchArtistBtn.addEventListener('click', async function (e) {
    e.preventDefault();

    const artistId = await _searchArtist(searchArtistInput.value);
    const getTheTracks = await _getArtistTopTracks(artistId);

    const spotifyArtistPlayer = await artistPlayer.setAttribute('src', `https://open.spotify.com/embed/artist/${artistId}?utm_source=generator`);

});

// search song button
searchSongBtn.addEventListener('click', async function (e) {
    e.preventDefault();

    const songSearched = await _searchSong(searchSongInput.value);
    const songSearchedId = await _searchSongForId(searchSongInput.value);
    const spotifySongPlayer = await songPlayer.setAttribute('src', `https://open.spotify.com/embed/track/${songSearchedId}?utm_source=generator`);

});

// search playlist button
searchPlaylistBtn.addEventListener('click', async function (e) {
    e.preventDefault();

    const playlistSearched = await _searchPlaylist(searchPlaylistInput.value);
    const spotifyPlaylistPlayer = await playlistPlayer.setAttribute('src', `https://open.spotify.com/embed/user/spotify/playlist/${playlistSearched}`);

});

// var createPlaylistSection = document.getElementById('create-playlist-section'); // create playlist search section
// var createPlaylistInput = document.getElementById('create-playlist-input');
// var createPlaylistBtn = document.getElementById('create-playlist-btn'); // create playlist
// var addSongToPlaylist = document.getElementById('add-song'); // add song to playlist
// var removeFromPlaylist = document.getElementById('remove-song'); // remove song from playlist

// const _createPlaylist = async () => {

//     const result = await fetch(`https://api.spotify.com/v1/users/me/playlists`, {
//         method: 'POST',
//         headers: { 'Authorization': 'Bearer ' + token },
//         data: {
//             "name": "New Playlist",
//             "description": "New playlist description",
//             "public": false
//         }
//     });

//     const data = await result.json();
//     console.log(data);
//     return data;
// };

// const _addToPlaylist = async (playlist_id) => {

//     const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
//         method: 'POST',
//         headers: { 'Authorization': 'Bearer ' + token },
//         data: {
//             "uris": [
//                 "string"
//             ],
//             "position": 0
//         }
//     });

//     const data = await result.json();
//     return data;
// };

// const _removeFromPlaylist = async (playlist_id) => {

//     const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
//         method: 'DELETE',
//         headers: { 'Authorization': 'Bearer ' + token }
//     });

//     const data = await result.json();
//     return data;
// };

// // create a new playlist button
// createPlaylistBtn.addEventListener('click', async function (e) {
//     e.preventDefault();

//     const newPlaylist = await _createPlaylist(createPlaylistInput.value);

// });

// // add this song to your playlist button
// addSongToPlaylist.addEventListener('click', async function (e) {
//     e.preventDefault();

//     const songAdded = await _addToPlaylist(songId);
// });

// // remove this song from your playlist button
// removeFromPlaylist.addEventListener('click', async function (e) {
//     e.preventDefault();

//     _removeFromPlaylist();
// });