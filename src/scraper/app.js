require('dotenv').config();
const { OpenAI } = require('openai');
const WebPageParser = require('./webparser');
const { userMessage } = require('./helper/usermessage');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

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
            { 
                role: 'system', 
                content: 'You are a helpful assistant that analyzes the contents of a website and provides a short summary, ignoring text that might be navigation related. Respond in markdown.' 
            },
            { 
                role: 'user', 
                content:  userPrompt 
            }
        ]
    });

    console.log(completion.choices[0].message.content);
}

main();

