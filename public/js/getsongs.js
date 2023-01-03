const songData = require('../../models/example-songs.json');

function getTracks(songData) {
  const songs = JSON.parse(songData);
  const songlist = [];
  for (i=0; i < songs.length; i++) {
    songlist.push(songlist[i].name)
  }
  return songlist;
} 


module.exports = getTracks;