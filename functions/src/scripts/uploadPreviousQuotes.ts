import axios from "axios";
import * as cheerio from "cheerio";
import admin from "firebase-admin";
import { scraper } from "../scraper";

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
    const quote = await scraper(dates[0]);
    await addQuote(quote[0]);
  } catch (err) {
    console.log(err);
  }
}

async function addQuote({ text, cttId }: { text: string; cttId: string }) {
  console.log("adding quote ", cttId);

  try {
    const docRef = db.collection("quotes").doc(cttId);
    const doc = await docRef.set({ text, cttId });
    console.log("Document written with ID: ", docRef.id, doc);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

getPreviousUrls();
