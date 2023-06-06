let query = '';

function renderPlaylist() {
  const playlistSection = document.querySelector('#playlistSection');
  const searchInput = document.querySelector('#searchInput');
  const query = searchInput.value.toLowerCase();

  // Clear any existing content in the playlist section
  playlistSection.innerHTML = '';

  // Create the search bar
  const searchBarHTML = `
    <input type="text" id="playlistSearchInput" placeholder="Search in Playlist">
    <button id="playlistSearchButton" onClick="performPlaylistSearch()">Search</button>
  `;

  // Append the search bar to the playlist section
  playlistSection.innerHTML = searchBarHTML;

  const searchButton = document.querySelector('#playlistSearchButton');

    // Add the About section
  const aboutSectionHTML = `
    <div id="aboutSection">
      <h3>About</h3>
      <p id="aboutText">${state.aboutText}</p>
      <button onclick="editAboutText()">Edit</button>
    </div>
  `;

  playlistSection.innerHTML += aboutSectionHTML;

  // Make a GET request to fetch the playlist data from the server with the query parameter
  fetch(`/api/playlists?query=${query}`)
    .then(res => res.json())
    .then(data => {
      // Iterate over the playlist data and create a list item for each song
      const playlistItems = data.map(song => {
        return `<section id="renderList">
                  <h2>${song.song_name}</h2>
                  <div>Artist: ${song.artist}</div>
                  <div>Album: ${song.album}</div>
                  <button onclick="deleteSong(${song.playlist_id})">Delete</button>
                </section>`;
      });

      // Append the playlist items to the playlist section
      playlistSection.innerHTML += `<ul>${playlistItems.join('')}</ul>`;
    })
    .catch(err => {
      console.error(err);
    });
}

function editAboutText() {
  const aboutTextElement = document.querySelector('#aboutText');
  const currentText = aboutTextElement.textContent;

  const newText = prompt('Enter new About text:', currentText);
  if (newText !== null) {
    aboutTextElement.textContent = newText;
    state.aboutText = newText;
  }
}


function performPlaylistSearch() {
  console.log("working")
  const searchInput = document.querySelector('#playlistSearchInput');
  const query = searchInput.value.toLowerCase();

  const playlistSection = document.querySelector('#playlistSection');
  const playlistItems = playlistSection.querySelectorAll('section');

  playlistItems.forEach(item => {
    const songName = item.querySelector('h2').textContent.toLowerCase();

    if (songName.includes(query)) {
      console.log(item)
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });

  // Check if no matching items found and display a message
  const noResultsMessage = document.querySelector('#noResultsMessage');
  if (playlistSection.querySelectorAll('section[style="display: block;"]').length === 0) {
    noResultsMessage.style.display = 'block';
  } 
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