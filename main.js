const scrapeEventDetails = require('./src/scraper/eventbriteScraper');
const enrichDataWithGoogleSearch = require('./src/scraper/googleSearchScraper');

// Example usage
const eventbriteUrl = 'https://www.eventbrite.com/';

async function run() {
  try {
    // Scrape event details
    const events = await scrapeEventDetails(eventbriteUrl);
    console.log('Event Details:', events);

    // Enrich data via Google Search
    await enrichDataWithGoogleSearch(events);

    // Log enriched event details
    console.log('Enriched Event Details:', events);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the script
run();