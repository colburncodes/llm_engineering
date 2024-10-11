
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

module.exports = { userMessage };
