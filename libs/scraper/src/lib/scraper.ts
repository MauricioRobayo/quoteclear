import axios from 'axios';
import * as cheerio from 'cheerio';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatDate(date: Date): string {
  const parts = dateFormatter.formatToParts(date);
  console.log(date);
  const day = parts.find((part) => part.type === 'day').value;
  const month = parts.find((part) => part.type === 'month').value;
  const year = parts.find((part) => part.type === 'year').value;

  return `${month}-${day}-${year}`.toLowerCase();
}

export function getPreviousThursday(date: Date): Date {
  const THURSDAY = 4;
  const dt = new Date(date);

  while (dt.getUTCDay() !== THURSDAY) {
    dt.setUTCDate(dt.getUTCDate() - 1);
  }

  return dt;
}

export async function scraper(date = new Date(), logger = console) {
  const previousThursday = getPreviousThursday(date);
  const formattedDate = formatDate(previousThursday);
  const url = `https://jamesclear.com/3-2-1/${formattedDate}`;

  try {
    const { data } = await axios.get(url);
    console.log(data);
    const $ = cheerio.load(data);
    const links = $('a[href^="https://ctt.ac/"]');
    const cttIds = new Set();
    $(links).each(function (i, link) {
      cttIds.add($(link).attr('href').replace(/.*\//, ''));
    });
  } catch (err) {
    logger.log(err);
  }
}

async function getCttContent(cttId) {
  const url = `https://clicktotweet.com/${cttId}`;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const title = $('title').text();
    console.log(title, title.replace(/(".*")/, ''));
  } catch (err) {
    console.log(err);
  }
}

getCttContent('7ma70');
