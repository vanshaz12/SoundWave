
const state = {
    songs: []
  }

  fetch('/api/songs')
    .then(res => res.json())
    .then(songs => {
      state.songs = songs
      renderTreasureList()
    })

  fetch('/api/sessions')
    .then(res => res.json())
    .then(data => {
      if (data.result === 'successful') {
        state.loggedInUser = data.email
      }
    })












fetch('/api/sessions')
  .then(res => res.json())
  .then(data => {
    if (data.result === 'successful') {
      state.loggedInUser = data.email
    }
  })

