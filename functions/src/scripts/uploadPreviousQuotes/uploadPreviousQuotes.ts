import axios from "axios";
import * as cheerio from "cheerio";
import admin from "firebase-admin";
import { getQuotes } from "../../scraper";
import { QuoteStorage } from "../../types";
import fs from "fs/promises";
import path from "path";

admin.initializeApp();
const db = admin.firestore();

async function getPreviousUrls() {
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

    const quotesPerDate = await Promise.all(
      dates.map(async (date) => {
        const quotes = await getQuotes(date);
        await Promise.all(quotes.map(addQuoteToDb));
        return quotes;
      })
    );

    await fs.writeFile(
      path.join(__dirname, "quotes.json"),
      JSON.stringify(quotesPerDate.flat())
    );
  } catch (err) {
    console.log("getPreviousUrls", err);
  }
}

async function addQuoteToDb({ text, cttId }: QuoteStorage) {
  try {
    const docRef = db.collection("quotes").doc(cttId);
    const doc = await docRef.get();
    if (doc.exists) {
      console.log(`Doc '${docRef.id} already exists!`);
      return;
    }
    await docRef.set({ text, cttId });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

getPreviousUrls();
