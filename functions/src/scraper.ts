import axios from "axios";
import * as cheerio from "cheerio";
import { QuoteStorage } from "./types";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatDate(date: Date): string {
  const parts = dateFormatter.formatToParts(date);
  const day = parts.find((part) => part.type === "day")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const year = parts.find((part) => part.type === "year")?.value;

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

function validQuote(quote: QuoteStorage | null): quote is QuoteStorage {
  return quote !== null;
}

export async function getQuotes(date = new Date()): Promise<QuoteStorage[]> {
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

  return (await Promise.all([...cttIds].map(getQuote))).filter(validQuote);
}

async function getQuote(cttId: string): Promise<QuoteStorage | null> {
  const url = `https://clicktotweet.com/${cttId}`;

  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const title = $("title").text();
  const match = title.replace(/["“”]/g, "").replace(/-@JamesClear/g, "");
  if (!match) {
    console.log(`Could not find quote in url '${url}' with title '${title}'`);
    return null;
  }

  return { text: match[1], cttId };
}
