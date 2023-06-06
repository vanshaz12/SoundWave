function renderHomePage() {
  const pageElement = document.querySelector('#page');
  pageElement.innerHTML = `
    <h2>Welcome, ${state.loggedInUser}</h2>
    <button onclick="renderHomePage()">Home</button>
    <div>
      <input type="text" id="searchInput" placeholder="Search">
      <button id="searchButton">Search</button> 
    </div>
    <ul id="playlistsList"></ul>
    <div>
      <button onclick="togglePlaylist()">View Playlist</button>
      <div id="playlistSection"></div>
    </div>
    <button onclick="logout()">Logout</button>

  `;
  

// Add event listener to search button
const searchButton = document.querySelector('#searchButton');
searchButton.addEventListener('click', performSearch);

console.log('search done')
}

function togglePlaylist() {
  const playlistSection = document.querySelector('#playlistSection');
  if (playlistSection.style.display === 'none') {
    playlistSection.style.display = 'block';
    renderPlaylist();
  } else {
    playlistSection.style.display = 'none';
  }
}

function performSearch() {
  const searchInput = document.querySelector('#searchInput');
  const query = searchInput.value;

  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '2c83331949msh9aeed50b3100423p1674b1jsn149647df92fb',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  };

  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      const searchResults = data.data;

      // Clear the previous search results
      const playlistsListElement = document.querySelector('#playlistsList');
      playlistsListElement.innerHTML = '';

      // Generate the table HTML
      const tableHTML = `
        <table>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Action</th>
          </tr>
          ${searchResults.map(result => `
            <tr>
              <td>${result.title}</td>
              <td>${result.artist.name}</td>
              <td>${result.album.title}</td>
              <td><button class="addButton" onClick="addToPlaylist('${result.title}', '${result.artist.name}', '${result.album.title}')">Add</button></td>
            </tr>
          `).join('')}
        </table>
      `;

      // Set the table HTML as the content of the playlistsList element
      playlistsListElement.innerHTML = tableHTML;
    })
    .catch(error => {
      console.error('Error occurred during search:', error);
    });

  // Clear the input field
  searchInput.value = '';
}

function addToPlaylist(title, artist, album) {
  const playlistName = 'Your Playlist Name'; // Replace 'Your Playlist Name' with the desired playlist name

  // Perform the logic to add the song to the playlist
  // For example, you can make an API request to add the song to the playlist
  fetch('/api/playlists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      playlistName: playlistName,
      songName: title,
      artist: artist,
      album: album
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log(`Added song: ${data.songName} - ${data.artist} - ${data.album} to playlist: ${playlistName}`);
      // Perform any necessary actions after adding the song to the playlist
    })
    .catch(err => {
      console.error(err);
    });
}

