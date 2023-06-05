const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the form from submitting normally

  const searchQuery = document.getElementById('search-input').value;

  // Call the API endpoint to perform the song search
  fetch(`/api/songs/search?query=${searchQuery}`)
    .then((response) => response.json())
    .then((data) => {
      // Process the search results and display them on the page
      displaySearchResults(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});