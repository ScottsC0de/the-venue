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

window.addEventListener("load", async function (e) {
  const result = await fetch("http://localhost:3001/api/token");
  const data = await result.json();
  token = data.token;
});

const _searchArtist = async (artistName) => {
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${artistName}&type=artist`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  console.log(data);
  return data.artists.items[0].id;
};

const _searchSong = async (songName) => {
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${songName}&type=track&limit=10`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  console.log(data);
  return data;
};

const _searchSongForId = async (songName) => {
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${songName}&type=track&limit=10`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  console.log(data);
  return data.tracks.items[0].id;
};

const _searchPlaylist = async (playlistName) => {
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${playlistName}&type=playlist&limit=15`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  console.log(data);
  return data.playlists.items[0].id;
};

const _getArtistTopTracks = async (id) => {
  const result = await fetch(
    `https://api.spotify.com/v1/artists/${id}/top-tracks?market=us`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  console.log(data);
  return data;
};

// search an artist
var searchArtistSection = document.getElementById('artist-section'); // artist // search general
// var searchSection = document.getElementById('search-section'); // general search section container
var searchArtistInput = document.getElementById('search-artist'); // artist search input field
var searchInput = document.getElementById('search-field'); // artist search input field
var searchArtistBtn = document.getElementById('artist-btn'); // search artist button
var searchBtn = document.getElementById('search-btn'); // search  button
var artistResultsDiv = document.getElementById('artist-search-results'); // div for artist iframe and buttons
var spotifyResultsDiv = document.getElementById('spotify-search-results'); // div for artist iframe and buttons
var shareArtistBtn = document.getElementById('share-artist-btn'); // button to add artist to stage
var shareBtn = document.getElementById('share-btn'); // button to add artist to stage

// search a song
var searchSongSection = document.getElementById("song-section"); // song search container
var searchSongInput = document.getElementById("search-song"); // song search input field
var searchSongBtn = document.getElementById("song-btn"); // search song button
var trackList = document.getElementById("song-search-results"); // div for song iframe and buttons
var shareSongBtn = document.getElementById("share-song-btn"); // button to add song to stage

// search a playlist
var searchPlaylistSection = document.getElementById("playlist-section"); // playlist search section
var searchPlaylistInput = document.getElementById("search-playlist"); // search a playlist input field
var searchPlaylistBtn = document.getElementById("search-playlist-btn"); // search a playlist button
var playlistResultsDiv = document.getElementById("playlist-search-results"); // iframe and button div
var sharePlaylistBtn = document.getElementById("share-playlist-btn"); // button to add playlist to stage

// iframe tags from html for spotify players
var artistPlayer = document.getElementById('artist-iframe');
var allPlayer = document.getElementById('spotify-iframe');
var songPlayer = document.getElementById('song-iframe');
var playlistPlayer = document.getElementById('playlist-iframe');

// one spotify api token makes all API calls
var apiToken = document.getElementById("api-token");
var postArtistBtn = document.getElementById('new-artist-post');
var postSongBtn = document.getElementById('new-song-post');
var postPlaylistBtn = document.getElementById('new-playlist-post');

// delete button for user posts
var deletePostBtn = document.querySelector('.deleteBtn');

// // search artist button
// searchArtistBtn.addEventListener('click', async function (e) {
//     e.preventDefault();

//     const artistId = await _searchArtist(searchArtistInput.value);
//     const getTheTracks = await _getArtistTopTracks(artistId);
//     const spotifyArtistPlayer = await artistPlayer.setAttribute('src', `https://open.spotify.com/embed/artist/${artistId}?utm_source=generator`);

// });

// // search general button
searchArtistBtn.addEventListener('click', async function (e) {
  e.preventDefault();

  const artistId = await _searchArtist(searchInput.value);
  const getTheTracks = await _getArtistTopTracks(artistId);
  const postSubject = document.getElementById('post-subject')
  // const spotifyArtistPlayer = await artistPlayer.setAttribute('src', `https://open.spotify.com/embed/artist/${artistId}?utm_source=generator`);
  const spotifyArtistPlayer = await allPlayer.setAttribute('src', `https://open.spotify.com/embed/artist/${artistId}?utm_source=generator`);
  searchResults.className = 'd-block';
  // newPostForm.className = 'd-block';
  // const artists_name = await _shareArtist.artists.items[0].name;
  // postSubject.textContent = artists_name;
});
// search song button
searchSongBtn.addEventListener('click', async function (e) {
  e.preventDefault();

  // const songSearched = await _searchSong(searchSongInput.value);
  const songSearched = await _searchSong(searchInput.value);
  const songSearchedId = await _searchSongForId(searchInput.value);
  const spotifySongPlayer = await allPlayer.setAttribute('src', `https://open.spotify.com/embed/track/${songSearchedId}?utm_source=generator`);
  searchResults.className = 'd-block';

});

// search playlist button
searchPlaylistBtn.addEventListener('click', async function (e) {
  e.preventDefault();

  // const playlistSearched = await _searchPlaylist(searchPlaylistInput.value);
  const playlistSearched = await _searchPlaylist(searchInput.value);
  const spotifyPlaylistPlayer = await allPlayer.setAttribute('src', `https://open.spotify.com/embed/user/spotify/playlist/${playlistSearched}`);
  searchResults.className = 'd-block';

});
var artistShareArray = [];
// getting artist name and image from JSON data
const _shareArtist = async (artistName) => {
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=1`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();

  var artists_name = data.artists.items[0].name;
  // var artistNameIdShare = data.artists.items[0].id;
  var image = data.artists.items[0].images[0].url;
  artistShareArray.push(artists_name, image);
  console.log(`artistShareArray:` + artistShareArray);
};

// Creating a function to store Artist Search (Artist Name and Album Image) to Post Table
const NewArtistPostHandler = async (event) => {
  event.preventDefault();
  console.log(artistShareArray);
  const name = document.querySelector("#post-name").value.trim();
  const description = document.querySelector("#post-desc").value.trim();
  const [artists_name, image] = artistShareArray;

  if (name && description) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ name, description, artists_name, image }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to create post");
    }
  }
};

var songShareArray = [];
// getting song name/id, artist name/id, album name/id from JSON data
const _shareSong = async (songName) => {
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${songName}&type=track&limit=1`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();

  var track_name = data.tracks.items[0].name;
  // var songNameIdShare = data.tracks.items[0].id;
  var artists_name = data.tracks.items[0].artists[0].name;
  // var songArtistNameIdShare = data.tracks.items[0].artists[0].id;
  var album_name = data.tracks.items[0].album.name;
  // var songAlbumIdShare = data.tracks.items[0].album.id;
  var image = data.tracks.items[0].album.images[0].url;
  songShareArray.push(track_name, artists_name, album_name, image);
  console.log(`songShareArray:` +  songShareArray);
};

// Creating a function to store Song Search (Track Name, Artist Name and Image) to Post Table
const NewSongPostHandler = async (event) => {
  event.preventDefault();
  console.log(songShareArray);
  const name = document.querySelector("#post-name").value.trim();
  const description = document.querySelector("#post-desc").value.trim();
  const [track_name, artists_name, album_name, image] = songShareArray;

  if (name && description) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
        track_name,
        artists_name,
        album_name,
        image,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to create post");
    }
  }
};
var playlistShareArray = [];
// getting playlist name/id, owner, image from JSON data
const _sharePlaylist = async (playlistName) => {
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${playlistName}&type=playlist&limit=15`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();

  var playlist_name = data.playlists.items[0].name;
  // var playlistNameIdShare = data.playlists.items[0].id;
  // var playlistOwner = data.playlists.items[0].owner.display_name;
  // var playlistOwnerId = data.playlists.items[0].owner.id;
  var image = data.playlists.items[0].images[0].url;
  playlistShareArray.push(playlist_name, image);
  console.log(`playlistShareArray:` + playlistShareArray);

};

// Creating a function to store Playlist Search (Playlist Name and Image) to Post Table
const NewPlaylistPostHandler = async (event) => {
  console.log(playlistShareArray);
  event.preventDefault();
  console.log(playlistShareArray);
  const name = document.querySelector("#post-name").value.trim();
  const description = document.querySelector("#post-desc").value.trim();
  const [playlist_name, image] = playlistShareArray;

  if (name && description) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ name, description, playlist_name, image }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to create post");
    }
  }
};

// // share artist button
// shareArtistBtn.addEventListener('click', async function (e) {
//     e.preventDefault();

//     const artistShared = await _shareArtist(searchArtistInput.value);

// });

// To delete a post from the groupies post list in backstage
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/spotify');
    } else {
      alert('Failed to delete post');
    }
  }
};



// When new Artist is searched and the Share Artist Post button is clicked save to Database Post Table

if (postArtistBtn) {
  postArtistBtn.addEventListener("click", NewArtistPostHandler);
}


// if (document.getElementById("new-artist-post")) {
//   document
//     .getElementById("new-artist-post")
//     .addEventListener("submit", NewArtistPostHandler);
// }


// When new Song is searched and the Share Song Post button is clicked save to Database Post Table

// if (document.getElementById("new-song-post")) {
//   document
//     .getElementById("new-song-post")
//     .addEventListener("submit", NewSongPostHandler);
// }

if (postSongBtn) {
  postSongBtn.addEventListener("click", NewSongPostHandler);
}


// When new Playlist is searched and the Share Playlist Post button is clicked save to Database Post Table
// if (document.getElementById("new-playlist-post")) {
//   document
//     .getElementById("new-playlist-post")
//     .addEventListener("submit", NewPlaylistPostHandler);
// }

if (postPlaylistBtn) {
  postPlaylistBtn.addEventListener("click", NewPlaylistPostHandler);
}


// when delete button is clicked next to post
if (deletePostBtn) {
  deletePostBtn.addEventListener("click", delButtonHandler);
}

// share song button
// if (shareSongBtn) {
//   shareSongBtn.addEventListener('click', async function (e) {
//     e.preventDefault();

    // share playlist button
    // if (sharePlaylistBtn) {
    //   sharePlaylistBtn.addEventListener('click', async function (e) {
    //     e.preventDefault();


// When Search song button is clicked it also sends data array to console log
searchArtistBtn.addEventListener("click", async function (e) {
  e.preventDefault();

  const artistShared = await _shareArtist(searchInput.value);
  newPostForm.className = 'd-block';

});

// When Search song button is clicked it also sends data array to console log
searchSongBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  const songSearched = await _searchSong(searchInput.value);
  const songShared = await _shareSong(searchInput.value);
  newPostForm.className = 'd-block';

});
// });

// When Search song button is clicked it also sends data array to console log
searchPlaylistBtn.addEventListener("click", async function (e) {
  e.preventDefault();


  const playlistShared = await _sharePlaylist(searchInput.value);
  newPostForm.className = 'd-block';

});

//       // save the music data when Share Artist button is submitted
//     });
// }




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
const searchOption = document.getElementById('choose-search');
const searchSection = document.getElementById('search-section');
// const searchByArtist = document.getElementById('artist-section');
const searchBySong = document.getElementById('song-section');
const searchByPlaylist = document.getElementById('playlist-section');
const searchResults = document.getElementById('search-results');
const newPostForm = document.getElementById('new-post-form');

searchOption.addEventListener('change', (event) => {
  toggleElement(event.target.value)
});




function toggleElement(option) {
  searchArtistBtn.className = 'd-none';
  searchSongBtn.className = 'd-none';
  searchPlaylistBtn.className = 'd-none';
  postArtistBtn.className = 'd-none';
  postSongBtn.className = 'd-none';
  postPlaylistBtn.className = 'd-none';
  switch (option) {
    case 'artist-option':
      searchArtistBtn.className = 'd-block';
      postArtistBtn.className = 'd-block';
      break;
    case 'song-option':
      searchSongBtn.className = 'd-block';
      postSongBtn.className = 'd-block';
      break;
    case 'playlist-option':
      searchPlaylistBtn.className = 'd-block';
      postPlaylistBtn.className = 'd-block';
      break;
    default: return;
  }
  // searchResults.className = 'd-block';
  // newPostForm.className = 'd-block';
};

