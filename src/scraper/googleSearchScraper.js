// googleSearchScraper.js

const puppeteer = require('puppeteer');

async function enrichWithGoogleSearch(events) {
  const enrichedEvents = [];

  for (const event of events) {
    const query = `${event.name} ${event.location} site:eventbrite.com`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
    await page.waitForSelector('.tF2Cxc');

    const searchResults = await page.evaluate(() => {
      const snippets = Array.from(document.querySelectorAll('.tF2Cxc'));
      return snippets.map(snippet => snippet.innerText);
    });

    enrichedEvents.push({
      ...event,
      searchResults,
    });

    await browser.close();
  }

  return enrichedEvents;
}

module.exports = enrichWithGoogleSearch;
