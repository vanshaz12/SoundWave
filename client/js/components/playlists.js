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
        return `<li>${song.song_name} - ${song.artist} - ${song.album}</li>`;
      });

      // Append the playlist items to the playlist section
      playlistSection.innerHTML = `<ul>${playlistItems.join('')}</ul>`;
    })
    .catch(err => {
      console.error(err);
    });
}


// function renderSongs() {
//   if (state.searchResults && state.searchResults.length > 0) {
//     return state.searchResults
//       .map(result => `
//         <li>
//           ${result.title}
//           <button class="addSongButton" onclick="addSongToPlaylist('${result.title}')">Add</button>
//         </li>
//       `)
//       .join('');
//   } else {
//     return 'No search results found.';
//   }
// }















// function deleteTreasure(event){
//   const deleteBtn = event.target
//   const treasureDOM = deleteBtn.closest('.treasure')
//   const treasureId = treasureDOM.dataset.id
//   fetch(`/api/treasures/${treasureId}`, {
//     method: 'DELETE'
//   })
//     .then(() => {
//       state.treasures = state.treasures.filter(t => t.id != treasureId)

//     renderTreasureList()
//     })
// }



// function renderPlaylist(playlists) {
//   const playlistSection = document.querySelector('#playlistSection');
//   playlistSection.innerHTML = `
//     <section class="playlist">
//       <h2>Playlist Names:</h2>
//       <ul id="playlistNames">
//         ${playlists.data.map(playlist => `
//           <li>
//             ${playlist.name}
//             <button class="deletePlaylistButton" onclick="deletePlaylist('${playlist.playlist_id}')">Delete</button>
//           </li>
//         `).join('')}
//       </ul>
//     </section>
// `;
// }

// function viewPlaylist() {
//   console.log('fetching playlist')

//   fetch('/api/playlists', {
//     method: 'GET'
//   })
//     .then(res => res.json())
//     .then(data => {
//       console.log("Playlist fetched successfully")

//       renderPlaylist(data)
//     })
//     .catch(err => {
//       console.error(err)
//     })
// }

  
// function createPlaylistData(playlistName) {
//   console.log('creating playlist')

//   fetch('/api/playlists', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ name: playlistName })
//   })
//     .then(res => res.json())
//     .then(() => {
//       console.log("Playlist created")
//     })
//     .catch(err => {
//       console.error(err)
//     })
// }
// function deletePlaylist(playlistId) {
//   fetch(`/api/playlists/${playlistId}`, {
//     method: 'DELETE'
//   })
//     .then(() => {
//       console.log('Deleted Playlist successfully');
//       viewPlaylist();
//     })
//     .catch(err => {
//       console.error(err);
//     });
// };
// function createPlaylist(event) {
// event.preventDefault();
// const playlistNameInput = document.querySelector('#playlistNameInput');
// const playlistName = playlistNameInput.value;

// // Perform the playlist creation logic here, e.g., making an API request
// // Once the playlist is created, you can update the playlists list or perform any other necessary actions

// createPlaylistData(playlistName)

// // Clear the input field
// playlistNameInput.value = '';
// }


// // function updatePlaylist(event) {
// //   const updateBtn = event.target;
// //   const playlistDOM = updateBtn.closest('.playlist');
// //   const playlistId = playlistDOM.dataset.id;

// //   // Retrieve updated playlist name from user input
// //   const newName = prompt('Enter the new playlist name:');
// //   if (newName === null || newName.trim() === '') {
// //     return;
// //   }

// //   fetch(`/api/playlists/${playlistId}`, {
// //     method: 'PUT',
// //     headers: {
// //       'Content-Type': 'application/json'
// //     },
// //     body: JSON.stringify({ name: newName })
// //   })
// //     .then(() => {
// //       playlistDOM.querySelector('.playlist-name').textContent = newName;
// //     })
// //     .catch(err => {
// //       console.error(err);
// //     });
// // };



// module.exports = {
//   renderPlaylist,
//   deletePlaylist,
//   updatePlaylist
// };
