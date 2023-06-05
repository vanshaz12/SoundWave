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

fetch('/api/playlist')
  .then(res => res.json())
  .then(songs => {
    state.songs = songs;
    console.log(state);
    if (state.loggedInUser) {
      renderHomePage();
    }
  });