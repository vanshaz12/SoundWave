const Playlist = require('../models/playlist');

function renderPlaylist(){
    document.querySelector('#page').innerHTML = `
    <section class="playlist">
        ${renderSong()}
    </section>
    `
}

function renderHomePage() {
  document.querySelector('#page').innerHTML =  `
  <section class="home">
  <h2>Home Page</h2>
  </section>
  `
}

function deletePlaylist(event) {
    const deleteBtn = event.target;
    const playlistDOM = deleteBtn.closest('.playlist');
    const playlistId = playlistDOM.dataset.id;
  
    fetch(`/api/playlists/${playlistId}`, {
      method: 'DELETE'
    })
      .then(() => {
        playlistDOM.remove();
      })
      .catch(err => {
        console.error(err);
      });
  };

function updatePlaylist(event) {
  const updateBtn = event.target;
  const playlistDOM = updateBtn.closest('.playlist');
  const playlistId = playlistDOM.dataset.id;

  // Retrieve updated playlist name from user input
  const newName = prompt('Enter the new playlist name:');
  if (newName === null || newName.trim() === '') {
    return;
  }

  fetch(`/api/playlists/${playlistId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: newName })
  })
    .then(() => {
      playlistDOM.querySelector('.playlist-name').textContent = newName;
    })
    .catch(err => {
      console.error(err);
    });
};

// function renderSong() {
//     return state.
// }

module.exports = renderPlaylist;
module.exports = deletePlaylist;
module.exports = updatePlaylist;