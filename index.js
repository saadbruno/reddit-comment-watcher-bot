require(`dotenv`).config();
const Snoowrap = require(`snoowrap`);
const { CommentStream } = require(`snoostorm`);
const { sendDiscordWebhook } = require(`./modules/discord`);

// Initialize snoowrap with credentials
const r = new Snoowrap({
    userAgent: `nodejs-reddit-bot`,
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD,
});

// Set up SnooStorm for streaming
const client = new Snoowrap(r);

// Options object is a Snoowrap Listing object, but with subreddit and pollTime options
const comments = new CommentStream(client, {
    subreddit: process.env.SUBREDDIT_TO_WATCH,
    limit: 10,
    pollTime: process.env.POLL_RATE || 10000,
});

comments.on("item", comment => {
    console.log(`New comment on thread "${comment.link_title}": ${comment.link_permalink}${comment.id}`);

    const regex = new RegExp(process.env.COMMENT_REGEX);

    // If the comment doesn't contain the string we're interested in, just return.
    if(!regex.test(comment.body)) return;

    console.log(`===== Interesting comment: =====\n${comment.body}\n================================\n`);

    sendDiscordWebhook(
        process.env.DISCORD_WEBHOOK_URL,
        `New comment in ${comment.link_title}`,
        `${comment.body}`,
        `${comment.link_permalink}${comment.id}`
      );

});

