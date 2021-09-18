import { QuoteStorage } from "../../functions/src/types";
import previousQuotes from "./previousQuotes.json";
import path from "path";
import fs from "fs";

const cleanQuotes = previousQuotes.map(cleanQuote);
fs.writeFileSync(
  path.join(__dirname, "./cleanQuotes.json"),
  JSON.stringify(cleanQuotes)
);

function cleanQuote({ cttId, text }: QuoteStorage) {
  return {
    cttId,
    text: text.replace(/[-–] ?@JamesClear/g, "").trim(),
  };
}
