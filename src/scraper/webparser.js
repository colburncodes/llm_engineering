const axios = require('axios');
const cheerio = require('cheerio');

class WebPageParser {
    constructor(url) {
        this.url = url;
        this.title = '';
        this.text = '';
    }

    async fetchAndParse() {
        try {
            const response = await axios.get(this.url);
            const html = response.data;
            const $ = cheerio.load(html);

            // Set the title
            this.title = $('title').text() || 'No title found';

            // Remove unwanted elements
            $('script, style, img, input').remove();

            // Set the text of all remaining elements
            this.text = $('body').text().trim();
        } catch (error) {
            console.error('Error fetching or parsing the webpage:', error);
        }
    }
}

module.exports = WebPageParser;