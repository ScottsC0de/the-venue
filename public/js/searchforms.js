const searchOption = document.getElementById('choose-search');
const searchByArtist = document.getElementById('artist-section');
const searchBySong = document.getElementById('song-section');
const searchByPlaylist = document.getElementById('playlist-section');

searchOption.addEventListener('change', (event) => {toggleElement(event.target.value)})
;
function selectSearch() {

} 

function toggleElement(option) {
  searchByArtist.className = 'd-none';
  searchBySong.className = 'd-none';
  searchByPlaylist.className = 'd-none';
  switch (option){
    case 'artist-option':
      searchByArtist.className = 'd-block';
      break;
    case 'song-option':
      searchBySong.className = 'd-block';
      break;
    case 'playlist-option':
      searchByPlaylist.className = 'd-block';
      break;
    default: 
      return;
  }
}