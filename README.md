# James Clear Quotes from The 3-2-1 Newsletter

[@JamesClear](https://twitter.com/JamesClear) random quotes from the [3-2-1 Newsletter](https://jamesclear.com/3-2-1)

- [Web app](https://james-clear-quotes.web.app)
- [JSON API](https://james-clear-quotes.web.app/api/random)

## Development

1. Start the `functions` and `firestore` emulators:

```
firebase emulators start
```

2. Seed the `firestore` emulator:

```
cd functions
FIRESTORE_EMULATOR_HOST="localhost:8080" npx ts-node src/scripts/seedDb/seedDb.ts
```

3. Start the web app:

```
cd web
npm start
```

## Contributing

Contributions, issues and feature requests are welcome!

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgement

All content is authored by [@JamesClear](https://twitter.com/JamesClear).

If you are using the [JSON API](https://james-clear-quotes.web.app/api/random), please properly give credit to him and if you haven't already, consider subscribing to his [newsletter](https://jamesclear.com/3-2-1).

## LICENSE

[MIT](LICENSE)
