function renderHomePage() {
    const pageElement = document.querySelector('#page');
    pageElement.innerHTML = `
      <h2>Welcome, ${state.loggedInUser}!</h2>
      <div>
        <input type="text" id="searchInput" placeholder="Search">
        <button id="searchButton">Search</button>
      </div>
      <ul id="playlistsList"></ul>
      <form id="createPlaylistForm" onsubmit="createPlaylist(event)">
        <input type="text" id="playlistNameInput" placeholder="Enter playlist name">
        <button type="submit">Create Playlist</button>
      </form>
      <button onclick="logout()">Logout</button>

    `;
  
    // Render the list of playlists
    const playlistsListElement = document.querySelector('#playlistsList');
    renderPlaylists(playlistsListElement);
  }
  
  function createPlaylist(event) {
    event.preventDefault();
    const playlistNameInput = document.querySelector('#playlistNameInput');
    const playlistName = playlistNameInput.value;
  
    // Perform the playlist creation logic here, e.g., making an API request
    // Once the playlist is created, you can update the playlists list or perform any other necessary actions
  
    // Clear the input field
    playlistNameInput.value = '';
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
  