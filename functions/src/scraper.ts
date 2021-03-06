import axios from "axios";
import * as cheerio from "cheerio";

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

export async function getCttIds(
  date = new Date()
): Promise<{ cttId: string; source: string }[]> {
  const previousThursday = getPreviousThursday(date);
  const formattedDate = formatDate(previousThursday);
  const url = `https://jamesclear.com/3-2-1/${formattedDate}`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const links = $('a[href^="https://ctt.ac/"]');
  const cttIds = new Map<string, { cttId: string; source: string }>();

  $(links).each(function (_, link) {
    const href = $(link).attr("href");
    if (href) {
      const cttId = href.replace(/.*\//, "");
      cttIds.set(cttId, {
        cttId,
        source: url,
      });
    }
  });

  return [...cttIds.values()];
}

export async function getQuoteText(cttId: string): Promise<string> {
  const url = `https://clicktotweet.com/${cttId}`;

  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const text = $("title")
    .text()
    .replace(/[-–]\s*@JamesClear/g, "")
    .trim();

  if (!/\w/.test(text)) {
    throw new Error(
      `getQuoteTest: not a quote on cttId '${cttId}' with text '${text}'`
    );
  }

  return text;
}

export function removeEnclosingQuotationMarks(text: string): string {
  if (text.startsWith('"') && text.endsWith('"')) {
    return text.slice(1, -1);
  }
  if (text.startsWith("“") && text.endsWith("”")) {
    return text.slice(1, -1);
  }
  if (text.startsWith("‘") && text.endsWith("’")) {
    return text.slice(1, -1);
  }
  return text;
}
