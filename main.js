// main.js

const eventbriteScraper = require('./scraper/eventbriteScraper');
const googleSearchScraper = require('./scraper/googleSearchScraper');

async function main() {
  const events = await eventbriteScraper();
  const enrichedEvents = await googleSearchScraper(events);

  console.log(JSON.stringify(enrichedEvents, null, 2));
}

main();
