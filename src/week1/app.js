require('dotenv').config();
const { OpenAI } = require('openai');
const WebPageParser = require('./webparser');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


/**
 * Generates a user message based on the parsed website content.
 * @param {Object} website - The parsed website object containing title and text.
 * @returns {string} - The generated user message.
 */
async function userMessage(website) {
    let userPrompt = '';
    userPrompt += 'You are looking at a website titled ' + website.title + '. ';
    userPrompt += 'The contents of this website is as follows;';
    userPrompt += website.text;
    return userPrompt;
}

/**
 * Main function to fetch and parse the website, generate a user message,
 * and get a completion from the OpenAI API.
 */
async function main() {
    const parser = new WebPageParser('https://whocolburn.com');
    await parser.fetchAndParse();
    console.log('Title:', parser.title);
    console.log('Text:', parser.text);

    const userPrompt = await userMessage(parser)

    const completion = await openai.chat.completions.create({ 
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: 'You are a helpful assistant that analyzes the contents of a website and provides a short summary, ignoring text that might be navigation related. Respond in markdown.' },
            { role: 'user', content:  userPrompt }
        ]
    });

    console.log(completion.choices[0].message.content);
}

main();

