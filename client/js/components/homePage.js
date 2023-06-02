function renderHomePage() {
    const pageElement = document.querySelector('#page');
    pageElement.innerHTML = '';
  
    // Render the title
    const titleElement = document.createElement('h2');
    titleElement.textContent = 'Home Page';
    pageElement.appendChild(titleElement);
  
    // Render the search bar
    const searchBarElement = document.createElement('input');
    searchBarElement.type = 'text';
    searchBarElement.placeholder = 'Search';
    pageElement.appendChild(searchBarElement);
  
    // Render the list of playlists
    const playlistsElement = document.createElement('ul');
    state.playlists.forEach(playlist => {
      const playlistItemElement = document.createElement('li');
      playlistItemElement.textContent = playlist.name;
  
      // Add an event listener to handle clicking on a playlist item
      playlistItemElement.addEventListener('click', () => {
        // Call the function to render the playlist page
        renderPlaylistPage(playlist.id);
      });
  
      playlistsElement.appendChild(playlistItemElement);
    });
  
    pageElement.appendChild(playlistsElement);
  }
  