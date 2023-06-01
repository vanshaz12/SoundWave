










fetch('/api/sessions')
  .then(res => res.json())
  .then(data => {
    if (data.result === 'successful') {
      state.loggedInUser = data.email
    }
  })