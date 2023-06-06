const state = {
  songs: [],
  loggedInUser: null,
  aboutText: 'This is my favorite playlist!'
};

fetch('/api/sessions')
  .then(res => res.json())
  .then(data => {
    if (data.result === 'successful') {
      state.loggedInUser = data.email;
    }
  })
  .catch(err => {
    console.error(err);
  });

fetch('/api/playlists')
  .then(res => res.json())
  .then(songs => {
    state.songs = songs;
    console.log(state);
    if (state.loggedInUser !== null) {
      updateNavigationMenu()
      renderHomePage();
    }
  })
  .catch(err => {
    console.error(err);
  });
