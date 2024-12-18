const axios = require('axios');

/**
 * Sends a webhook to Discord with an embed.
 * @param {string} webhookUrl - The Discord webhook URL.
 * @param {string} title - The title of the embed.
 * @param {string} description - The description text in the embed.
 * @param {string} url - A URL to include in the embed.
 */
async function sendDiscordWebhook(webhookUrl, title, description, url) {
    try {
        const payload = {
            embeds: [
                {
                    title: title,
                    description: description,
                    url: url,
                    color: 3447003, // Optional: blue color for the embed
                },
            ],
        };

        const response = await axios.post(webhookUrl, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(`Webhook sent successfully: ${response.status}`);
    } catch (error) {
        console.error('Error sending webhook:', error.message);
    }
}

module.exports = { sendDiscordWebhook };