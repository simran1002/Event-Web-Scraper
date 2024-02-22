const axios = require('axios');

async function enrichDataWithGoogleSearch(events) {
  const apiKey = 'YOUR_GOOGLE_API_KEY';
  const cx = 'YOUR_CUSTOM_SEARCH_ENGINE_ID';

  for (const event of events) {
    // Construct Google search query using the event name and/or organizer
    const searchQuery = `${event.name} ${event.organizer} event`;

    try {
      // Fetch real search results using Google Custom Search API
      const searchResults = await getGoogleSearchResults(searchQuery, apiKey, cx);

      // Extract relevant snippets or links
      const enrichedData = processSearchResults(searchResults);

      // Associate enriched data with the corresponding event details
      event.googleSearchResult = enrichedData;
    } catch (error) {
      console.error(`Error enriching data for ${event.name}: ${error.message}`);
    }
  }
}

async function getGoogleSearchResults(query, apiKey, cx) {
  const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${cx}`;

  const response = await axios.get(apiUrl);
  return response.data.items;
}

function processSearchResults(results) {
  return results.map((result) => ({
    title: result.title,
    snippet: result.snippet,
    link: result.link,
  }));
}

module.exports = enrichDataWithGoogleSearch;
