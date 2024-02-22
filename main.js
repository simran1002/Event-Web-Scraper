const scrapeEventDetails = require('./eventScraper');
const enrichDataWithGoogleSearch = require('./googleScraper');

// Example usage
const eventbriteUrl = 'https://www.eventbrite.com/';
scrapeEventDetails(eventbriteUrl)
  .then(async (events) => {
    console.log('Event Details:', events);

    // Enrich data via Google Search
    await enrichDataWithGoogleSearch(events);

    console.log('Enriched Event Details:', events);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
