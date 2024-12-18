# reddit-comment-watcher-bot
A bot that watches for specific comments in specific subreddits and posts those comments on Discord via a webhook

For example, you can get a Discord Webhook for every post that contains the word "Kiriko" in /r/Overwatch.

# Usage:
## Without Docker:
- Install Node.js
- Clone the repository
- Create a Reddit app on [Reddit Apps](https://www.reddit.com/prefs/apps) (select "script" as the app type) and note down the app ID and Secret
- Create a [Discord webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) on the desired Discord channel
- Copy the `TEMPLATE.env` to `.env` and fill in with the data for your app
- Run the app with `node index.js`

## With Docker:
- Create a Reddit app on [Reddit Apps](https://www.reddit.com/prefs/apps) (select "script" as the app type) and note down the app ID and Secret
- Create a [Discord webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) on the desired Discord channel
- Create a `docker-compose.yml` like this (replacing the enviroment with the data for your app)
```yml
services:
  reddit-comment-watcher-bot:
    image: saadbruno/reddit-comment-watcher-bot:latest
    environment:
        REDDIT_CLIENT_ID: 123456
        REDDIT_CLIENT_SECRET: c-9876543
        REDDIT_USERNAME: foo
        REDDIT_PASSWORD: bar
        SUBREDDIT_TO_WATCH: IAmA
        COMMENT_REGEX: ^abc$
        POLL_RATE: 10000 #optional: how frequent we wanna get data from reddit in milisseconds. Defaults to 10 seconds
        DISCORD_WEBHOOK_URL: https://discord.com/api/webhooks/123456/abcdef
    restart: always
```
- Run `docker compose up -d`