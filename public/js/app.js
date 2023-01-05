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
    console.log(data);
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
var shareArtistBtn = document.getElementById('share-artist-btn'); // button to add artist to stage

// search a song
var searchSongSection = document.getElementById('song-section'); // song search container
var searchSongInput = document.getElementById('search-song'); // song search input field
var searchSongBtn = document.getElementById('song-btn'); // search song button
var trackList = document.getElementById('song-search-results'); // div for song iframe and buttons
var shareSongBtn = document.getElementById('share-song-btn');// button to add song to stage

// search a playlist
var searchPlaylistSection = document.getElementById('playlist-section'); // playlist search section
var searchPlaylistInput = document.getElementById('search-playlist'); // search a playlist input field
var searchPlaylistBtn = document.getElementById('search-playlist-btn'); // search a playlist button
var playlistResultsDiv = document.getElementById('playlist-search-results'); // iframe and button div
var sharePlaylistBtn = document.getElementById('share-playlist-btn'); // button to add playlist to stage

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

// getting artist name and image from JSON data
const _shareArtist = async (artistName) => {

    const result = await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=1`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    var artistShareArray = [];
    var artistNameShare = data.artists.items[0].name;
    var artistNameIdShare = data.artists.items[0].id;
    var artistImgShare = data.artists.items[0].images[0].url;
    artistShareArray.push(artistNameShare, artistNameIdShare, artistImgShare);
    console.log(artistShareArray);

};

// getting song name/id, artist name/id, album name/id from JSON data
const _shareSong = async (songName) => {

    const result = await fetch(`https://api.spotify.com/v1/search?q=${songName}&type=track&limit=1`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    var songShareArray = [];
    var songNameShare = data.tracks.items[0].name;
    var songNameIdShare = data.tracks.items[0].id;
    var songArtistNameShare = data.tracks.items[0].artists[0].name;
    var songArtistNameIdShare = data.tracks.items[0].artists[0].id;
    var songAlbumShare = data.tracks.items[0].album.name;
    var songAlbumIdShare = data.tracks.items[0].album.id;
    var songImgShare = data.tracks.items[0].album.images[0].url;
    songShareArray.push(songNameShare, songNameIdShare, songArtistNameShare, songArtistNameIdShare, songAlbumShare, songAlbumIdShare, songImgShare);
    console.log(songShareArray);

};

// getting playlist name/id, owner, image from JSON data
const _sharePlaylist = async (playlistName) => {

    const result = await fetch(`https://api.spotify.com/v1/search?q=${playlistName}&type=playlist&limit=15`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    var playlistShareArray = [];
    var playlistNameShare = data.playlists.items[0].name;
    var playlistNameIdShare = data.playlists.items[0].id;
    var playlistOwner = data.playlists.items[0].owner.display_name;
    var playlistOwnerId = data.playlists.items[0].owner.id;
    var playlistImgShare = data.playlists.items[0].images[0].url;
    playlistShareArray.push(playlistNameShare, playlistNameIdShare, playlistOwner, playlistOwnerId, playlistImgShare);
    console.log(playlistShareArray);

};

// share artist button
shareArtistBtn.addEventListener('click', async function (e) {
    e.preventDefault();

    const artistShared = await _shareArtist(searchArtistInput.value);

});

// share song button
shareSongBtn.addEventListener('click', async function (e) {
    e.preventDefault();

    const songSearched = await _searchSong(searchSongInput.value);
    const songShared = await _shareSong(searchSongInput.value);

});

// share playlist button
sharePlaylistBtn.addEventListener('click', async function (e) {
    e.preventDefault();

    const playlistShared = await _sharePlaylist(searchPlaylistInput.value);

});

// save the music data when Share Artist button is submitted




// // save the post when Share button is submitted
// const newFormHandler = async (event) => {
//     event.preventDefault();
  
//     const name = document.querySelector('#post-name').value.trim();
//     const description = document.querySelector('#post-desc').value.trim();
  
//     if (name && description) {
//       const response = await fetch(`/api/posts`, {
//         method: 'POST',
//         body: JSON.stringify({ name, description }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (response.ok) {
//         document.location.replace('/mainstage');
//       } else {
//         alert('Failed to create post');
//       }
//     }
//   };

//   if (document.querySelector('.new-post-form')){
//     document
//       .querySelector('.new-post-form')
//       .addEventListener('submit', newFormHandler);
//   }