# James Clear Quotes

url: https://jamesclear.com/3-2-1

1. Scraper

Letter is sent every Thursday.

Each url uses the date:

https://jamesclear.com/3-2-1/september-2-2021

date format is mmmm-d-yyyy

Run the scraper on Friday, use previous day's date to get the url:

```js
const url = `https://jamesclear.com/3-2-1/${date}`;
```

JC quotes have a [clicktotweet](https://clicktotweet.com/) link:

```
<a href="https://ctt.ac/0A6UV">Share this on Twitter</a>
```

Search for all links with content or with `https://ctt.ac/[ something ]` on the href.

The tweet url responds with 301, we should follow the redirect to `https://clicktotweet.com`.

Replace `[ something ]` in `https://clicktotweet.com/[ something ]`.

The quote is on the title from the document.

Get the quote, save it with the original ctt link.

The scraper should get a date to scrape, and should return an object with the quote and the link.

`scraper(date: Date): { quote: string, ctt: string }`
