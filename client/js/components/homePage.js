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

    try {
      const response = fetch(`https://api.deezer.com/search?q=${query}`);
      const data = response.json();
      // Process the data from the API response as per your requirements
      console.log(data);
    } catch (error) {
      console.error('Error occurred during search:', error);
    }

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