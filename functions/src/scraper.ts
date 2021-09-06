import axios from "axios";
import * as cheerio from "cheerio";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatDate(date: Date): string {
  const parts = dateFormatter.formatToParts(date);
  console.log(date);
  const day = parts.find((part) => part.type === "day")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const year = parts.find((part) => part.type === "year")?.value;

  if (day === undefined || month === undefined || year === undefined) {
    throw new Error(`Could not format date '${date}'!`);
  }

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

type Quote = {
  text: string;
  cttId: string;
};

export async function scraper(date = new Date()): Promise<Quote[]> {
  const previousThursday = getPreviousThursday(date);
  const formattedDate = formatDate(previousThursday);
  const url = `https://jamesclear.com/3-2-1/${formattedDate}`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const links = $('a[href^="https://ctt.ac/"]');
  const cttIds = new Set<string>();

  $(links).each(function (_, link) {
    const href = $(link).attr("href");
    if (href) {
      cttIds.add(href.replace(/.*\//, ""));
    }
  });

  return Promise.all([...cttIds].map(getCttContent));
}

async function getCttContent(cttId: string): Promise<Quote> {
  const url = `https://clicktotweet.com/${cttId}`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const title = $("title").text();
  const match = title.match(/"(.*)"/s);
  if (!match) {
    throw new Error(`Could not find quote in '${url}'!'`);
  }

  return { text: match[1], cttId };
}
