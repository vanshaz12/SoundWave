function renderPlaylist() {
  const playlistSection = document.querySelector('#playlistSection');

  // Clear any existing content in the playlist section
  playlistSection.innerHTML = '';

  // Make a GET request to fetch the playlist data from the server
  fetch('/api/playlists')
    .then(res => res.json())
    .then(data => {
      // Iterate over the playlist data and create a list item for each song
      const playlistItems = data.map(song => {
        return `<section>
                  <h2>${song.song_name}</h2>
                  <div>Artist: ${song.artist}</div>
                  <div>Album: ${song.album}</div>
                  <button onclick="deleteSong(${song.playlist_id})">Delete</button>
                </section>`;
      });

      // Append the playlist items to the playlist section
      playlistSection.innerHTML = `<ul>${playlistItems.join('')}</ul>`;
    })
    .catch(err => {
      console.error(err);
    });
}


function deleteSong(playlistId) {
  fetch(`/api/playlists/${playlistId}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => {
      console.log(`Song with playlist ID ${playlistId} deleted`);
      // Call the renderPlaylist() function to update the playlist view
      renderPlaylist();
    })
    .catch(err => {
      console.error(err);
    });
}