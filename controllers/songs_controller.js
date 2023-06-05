router.get('/search', (req, res) => {
    const query = req.query.query; // Get the search query from the request query parameters
  
    // Perform the search logic here and retrieve the search results
    const searchResults = performSongSearch(query);
  
    res.json(searchResults);
  });  