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
      <button onclick="logout()">Logout</button>

    `;
  
    // Render the list of playlists
    const playlistsListElement = document.querySelector('#playlist');
    renderPlaylist(playlistsListElement);

    // Add event listener to search button
    const searchButton = document.querySelector('#searchButton');
    searchButton.addEventListener('click', performSearch);
  }
  
  function renderPlaylist(){
    document.querySelector('#page').innerHTML = `
    <section class="playlist">
        ${renderSong()}
    </section>
    `
}
    
  function performSearch() {
    const searchInput = document.querySelector('#searchInput');
    const query = searchInput.value;
  
    const url = `https://deezerdevs-deezer.p.rapidapi.com/track/${query}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.API_SECRET_KEY,
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

  function addToPlaylist(playlistId, songId) {
    const data = {
      playlistId: playlistId,
      songId: songId,
    };
  
    fetch('/api/playlist/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server after adding the song to the playlist
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  