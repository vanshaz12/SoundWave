const state = {
  songs: [],
};

fetch('/api/sessions')
  .then(res => res.json())
  .then(data => {
    if (data.result === 'successful') {
      state.loggedInUser = data.email;
    }
  });

fetch('/api/playlists')
  .then(res => res.json())
  .then(songs => {
    state.songs = songs;
    console.log(state);
    if (state.loggedInUser) {
      renderHomePage();
    }
  })
  .catch(err => {
    console.error(err);
  });
