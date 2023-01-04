// const songData = require('./modules/example-songs');
import {tracks} from '../js/modules/example-songs';
function getTracks(tracks) {
  const songs = JSON.parse(tracks);
  const songlist = [];
  for (i=0; i < songs.length; i++) {
    songlist.push(songlist[i].name)
  }
  return songlist;
} 


module.exports = getTracks(tracks);