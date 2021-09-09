import { getQuoteText } from "../../functions/src/scraper";
import { QuoteStorage } from "../../functions/src/types";
import cttIds from "./previousCttIds.json";
import fs from "fs/promises";
import path from "path";

async function getPreviousQuotes() {
  const quotes: QuoteStorage[] = [];
  for (const cttId of cttIds) {
    const wait = Math.ceil(Math.random() * 5);
    console.log(`Waiting ${wait}s...`);
    await new Promise((resolve) => setTimeout(resolve, wait * 1000));

    try {
      console.log(`Getting quote for ${cttId.cttId}...`);
      const quote = await getQuoteText(cttId.cttId);
      console.log(`Done! Got ${JSON.stringify(quote, undefined, 2)}`);

      quotes.push({
        ...cttId,
        text: quote,
      });
    } catch (err) {
      console.log(`Failed on ${cttId}`);
    }
  }

  await fs.writeFile(
    path.join(__dirname, "previousQuotes.json"),
    JSON.stringify(quotes)
  );
}

getPreviousQuotes();
