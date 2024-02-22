const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const ObjectsToCsv = require('objects-to-csv');

async function scrapeEventDetails(url) {
  try {
    // Make a GET request to the Eventbrite page
    const response = await axios.get(url);

    // Load the HTML content into Cheerio
    const $ = cheerio.load(response.data);

    // Extract key details of events
    const events = [];

    $('.event-card').each((index, element) => {
      const event = {
        name: $(element).find('.event-name').text().trim(),
        date: $(element).find('.event-date').text().trim(),
        location: $(element).find('.event-location').text().trim(),
        description: $(element).find('.event-description').text().trim(),
        organizer: $(element).find('.event-organizer').text().trim(),
      };

      events.push(event);
    });

    // Save extracted information in JSON format
    const jsonFileName = 'events.json';
    fs.writeFileSync(jsonFileName, JSON.stringify(events, null, 2));
    console.log(`JSON data saved to ${jsonFileName}`);

    // Save extracted information in CSV format
    const csv = new ObjectsToCsv(events);
    const csvFileName = 'events.csv';
    await csv.toDisk(csvFileName);
    console.log(`CSV data saved to ${csvFileName}`);

    return events;
  } catch (error) {
    console.error('Event Scraper Error:', error.message);
    throw error;
  }
}

module.exports = scrapeEventDetails;
