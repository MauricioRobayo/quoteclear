import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs/promises";
import path from "path";

async function getPreviousDates(): Promise<void> {
  try {
    const { data } = await axios.get("https://jamesclear.com/3-2-1");
    const $ = cheerio.load(data);
    const links = $("a.all-articles__news__post");

    const dates: Date[] = [];
    $(links).each((_, link) => {
      const href = $(link).attr("href");
      if (href) {
        const date = new Date(href.replace(/.*\//, ""));
        dates.push(date);
      }
    });
    await fs.writeFile(
      path.join(__dirname, "previousDates.json"),
      JSON.stringify(dates)
    );
  } catch (err) {
    console.log(err);
  }
}

getPreviousDates();
