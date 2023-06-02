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
    `;
  
    // Render the list of playlists
    const playlistsListElement = document.querySelector('#playlistsList');
    renderPlaylists(playlistsListElement);

    // Add event listener to search button
    const searchButton = document.querySelector('#searchButton');
    searchButton.addEventListener('click', performSearch);
  }
  
    
  function performSearch() {
    const searchInput = document.querySelector('#searchInput');
    const query = searchInput.value;
  
    fetch(`https://api.deezer.com/search?q=${query}`)
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

  function createPlaylist(event) {
    event.preventDefault();
    const playlistNameInput = document.querySelector('#playlistNameInput');
    const playlistName = playlistNameInput.value;
  
    // Perform the playlist creation logic here, e.g., making an API request
    // Once the playlist is created, you can update the playlists list or perform any other necessary actions
  
    // Clear the input field
    playlistNameInput.value = '';
  }