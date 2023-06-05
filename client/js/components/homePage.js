function renderHomePage() {
  const pageElement = document.querySelector('#page');
  pageElement.innerHTML = `
    <h2>Welcome, ${state.loggedInUser}</h2>
    <div>
      <input type="text" id="searchInput" placeholder="Search">
      <button id="searchButton">Search</button>
    </div>
    <ul id="playlistsList"></ul>
    <form id="createPlaylistForm" onsubmit="createPlaylist(event)">
      <input type="text" id="playlistNameInput" placeholder="Enter playlist name">
      <button type="submit">Create Playlist</button>
    </form>
    <div>
    <button onclick="viewPlaylist()">View Playlist</button>
    <div id="playlistSection"></div>
    </div>
    <button onclick="logout()">Logout</button>

  `;

// Add event listener to search button
const searchButton = document.querySelector('#searchButton');
searchButton.addEventListener('click', performSearch);

console.log('search done')
// // Render the list of playlists
// const playlistsListElement = document.querySelector('#playlistsList');
// renderPlaylists(playlistsListElement);
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

      // Render each search result
      searchResults.forEach((result) => {
        const resultItem = document.createElement('li');
        resultItem.innerHTML = `
          <div>
            <strong>Title:</strong> ${result.title}
          </div>
          <div>
            <strong>Artist:</strong> ${result.artist.name}
          </div>
          <div>
            <strong>Album:</strong> ${result.album.title}
          </div>
        `;
        playlistsListElement.appendChild(resultItem);
      });
    })
    .catch(error => {
      console.error('Error occurred during search:', error);
    });

  // Clear the input field
  searchInput.value = '';
}

function logout() {
  fetch('/api/sessions', {
    method: 'DELETE',
  })
    .then(res => res.json())
    .then(() => {
      state.loggedInUser = '';
      renderLogin();
    })
    .catch(err => {
      console.error(err);
    });
}
