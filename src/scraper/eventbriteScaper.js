// eventbriteScraper.js

const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeEventbrite() {
  const eventbriteURL = 'https://www.eventbrite.com/';
  const response = await axios.get(eventbriteURL);
  const $ = cheerio.load(response.data);

  const events = [];

  $('.eds-media-card-content__body').each((index, element) => {
    const eventName = $(element).find('.eds-media-card-content__action-link').text().trim();
    const eventDate = $(element).find('.eds-text-bs--fixed.eds-text-color--grey-600').text().trim();
    const eventLocation = $(element).find('.eds-text-bs--fixed.eds-text-color--grey-600').next('div').text().trim();

    events.push({
      name: eventName,
      date: eventDate,
      location: eventLocation,
    });
  });

  return events;
}

module.exports = scrapeEventbrite;
