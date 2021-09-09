# James Clear Quotes from the 3-2-1 Newsletter

The 3-2-1 Newsletter is one of the most popular newsletters in the world.

Every Thursday, the latest issue is sent to over 1,000,000 people.

Each message includes 3 short ideas from James Clear, 2 quotes from others, and 1 question to ponder.

Most of the 3 ideas sent are short enough to fit on a tweet.

This project collects those ideas and makes them available through an open source and free [JSON API](https://quoteclear.web.app/api/random) (not all quotes are included, just the ones that fit on a tweet).

New quotes are automatically included every Thursday after the newsletter has been sent.

You can visit the [web app](https://quoteclear.web.app) to get a taste of it.

## Development

2. Run the `watch` script inside the functions directory:

```
cd functions && npm run watch
```

1. Run the `emulators` script from the `scripts` directory, it will start the `functions` and `firestore` emulators and populate `firestore` emulator:

```
cs scripts && npm run emulators
```

3. Start the web app:

```
cd web
cd web && npm start
```

## Contributing

Contributions, issues and feature requests are welcome!

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgement

All content is authored by [@JamesClear](https://twitter.com/JamesClear).

If you are using the [JSON API](https://quoteclear.web.app/api/random), please properly give credit to him and if you haven't already, consider subscribing to his [newsletter](https://jamesclear.com/3-2-1).

## LICENSE

[MIT](LICENSE)
