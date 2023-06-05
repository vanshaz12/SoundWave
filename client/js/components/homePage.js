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
          <div id="songNameInput">
            <strong>Title:</strong> ${result.title}
          </div>
          <div>
            <strong>Artist:</strong> ${result.artist.name}
          </div>
          <div>
            <strong>Album:</strong> ${result.album.title}
          </div>
          <form id="addSongForm" onsubmit="addSongToPlaylist(event)">
          <label for="playlistSelect">Select Playlist:</label>
          <select id="playlistSelect" required>
            <option value="playlist1">Playlist 1</option>
            <option value="playlist2">Playlist 2</option>
            <option value="playlist3">Playlist 3</option>
          </select>
          <button type="submit">Add to Playlist</button>
          </form>
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

function renderPlaylistData(playlist) {
  const playlistSection = document.querySelector('#playlistSection');
  playlistSection.innerHTML = `
    <section class="playlist">
      <h2>${playlist.name}</h2>
      <ul id="playlistSongs">
        ${playlist.songs.map(song => `
          <li>
            ${song.title} - ${song.artist}
          </li>
        `).join('')}
      </ul>
    </section>
  `;

  
}

function addSongToPlaylist(event) {
  event.preventDefault();
  const playlistSelect = document.getElementById('playlistSelect');
  const songNameInput = document.getElementById('songNameInput');
  const playlistId = playlistSelect.value;
  const songName = songNameInput.value;

  const requestBody = {
    playlistId: playlistId,
    songName: songName
  };

  fetch('/api/playlists/add-song', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .then(res => res.json())
    .then(data => {
      console.log("Song added to playlist:", data);
      // Perform any necessary actions after adding the song to the playlist
    })
    .catch(err => {
      console.error(err);
    });

  // Clear the input fields
  playlistSelect.value = '';
  songNameInput.value = '';
}


function addSongs() {
  document.querySelector('#page').innerHTML = `
    <section class='create-treasure'>
      <form action="" onSubmit="createTreasure(event)">
        <h2>Add Treasure</h2>
        <fieldset>
          <label for="">Name: </label>
          <input type="text" name="name">
        </fieldset>
        <fieldset>
          <label for="">Clue: </label>
          <textarea name="clue" id="" cols="30" rows="10"></textarea>
        </fieldset>
        <fieldset>
          <label for="">Address: </label>
          <input type="text" name="address">
        </fieldset>
        <button>Add Treasure</button>
      </form>
    </section>
  `
}






















































// function renderPlaylist() {
//   const pageElement = document.querySelector('#page');
//   pageElement.innerHTML = `
//     <h2>Welcome, ${state.loggedInUser}</h2>
//     <div>
//       <input type="text" id="searchInput" placeholder="Search">
//       <button id="searchButton">Search</button>
//     </div>
//     <ul id="playlistsList"></ul>
//     <form id="addSongForm" onsubmit="addSongToPlaylist(event)">
//       <label for="playlistSelect">Select Playlist:</label>
//       <select id="playlistSelect" required>
//         <option value="playlist1">Playlist 1</option>
//         <option value="playlist2">Playlist 2</option>
//         <option value="playlist3">Playlist 3</option>
//       </select>
//       <label for="songNameInput">Song Name:</label>
//       <input type="text" id="songNameInput" required>
//       <button type="submit">Add to Playlist</button>
//     </form>
//     <div>
//       <button onclick="viewPlaylist()">View Playlist</button>
//       <div id="playlistSection"></div>
//     </div>
//     <button onclick="logout()">Logout</button>
//   `;

//   const searchButton = document.querySelector('#searchButton');
//   searchButton.addEventListener('click', performSearch);
// }