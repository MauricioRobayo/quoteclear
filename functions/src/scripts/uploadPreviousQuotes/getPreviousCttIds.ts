import previousDates from "./previousDates.json";
import { getCttIds } from "../../scraper";
import fs from "fs/promises";
import path from "path";

async function getPreviousCttIds() {
  const allCttIds: { cttId: string; source: string }[] = [];

  for (const date of previousDates) {
    const wait = Math.ceil(Math.random() * 5);
    console.log(`Waiting ${wait}s...`);
    await new Promise((resolve) => setTimeout(resolve, wait * 1000));

    try {
      console.log(`Getting cttIds for ${date}...`);
      const dateCttIds = await getCttIds(new Date(date));
      console.log(`Done! Got ${dateCttIds.length} references`);
      allCttIds.push(...dateCttIds);
    } catch (err) {
      console.log(`Failed on ${date}!`);
    }
  }

  await fs.writeFile(
    path.join(__dirname, "previousCttIds.json"),
    JSON.stringify(allCttIds)
  );
}

getPreviousCttIds();
