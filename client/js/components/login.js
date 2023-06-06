

function renderLogin() {
  document.querySelector('#page').innerHTML = `
    <section class='log-in'>
      <form action="" onSubmit="logIn(event)">
        <h2>Login:</h2>
        <fieldset>
          <label for="">Email: </label>
          <input type="text" name="email">
        </fieldset>
        <fieldset>
          <label for="">Password: </label>
          <input type="password" name="password">
        </fieldset>
        <button>Log in</button>
      </form>
    </section>
  `
}
function logIn(event) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form));

  fetch('/api/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(email => {
      console.log(`email `, email["email"]);
      state.loggedInUser = email["email"];
      updateNavigationMenu(); // Update the navigation menu after successful login
      renderHomePage();
    });
}

function logout() {
  fetch('/api/sessions', {
    method: 'DELETE',
  })
    .then(res => res.json())
    .then(() => {
      state.loggedInUser = null;
      updateNavigationMenu(); // Update the navigation menu after successful logout
      renderLogin();
    })
    .catch(err => {
      console.error(err);
    });
}


function updateNavigationMenu() {
  const navigationMenu = document.querySelector('.header-nav');
  const signUpLink = document.getElementById('signUpLink');
  const loginLink = document.getElementById('loginLink');

  if (state.loggedInUser !== null) {
    console.log('loggedin user', state.loggedInUser)
    navigationMenu.style.display = 'none'; // Hide the navigation menu
  } else {
    console.log('logout', state.loggedInUser)
    navigationMenu.style.display = 'block'; // Show the navigation menu
    signUpLink.style.display = 'block'; // Show the "Sign Up" option
    loginLink.style.display = 'block'; // Show the "Log In" option
  }
}



