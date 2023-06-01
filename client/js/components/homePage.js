function renderHomePage() {
    const pageElement = document.querySelector('#page');
  
    if (state.loggedInUser) {
      // User is logged in, render home page with search bar and playlist
      pageElement.innerHTML = `
        <section>
          <h2>Welcome, ${state.loggedInUser}!</h2>
          <input type="text" placeholder="Search...">
          <ul>
            ${renderPlaylists()}
          </ul>
        </section>
      `;
    } else {
      // User is not logged in, render sign up and login options
      pageElement.innerHTML = `
        <section>
          <h2>Title</h2>
          <button onclick="renderSignUp()">Sign Up</button>
          <button onclick="renderLogin()">Login</button>
        </section>
      `;
    }
  }