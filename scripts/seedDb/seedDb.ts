import * as admin from "firebase-admin";
import { QuoteStorage } from "../../functions/src/types";
import cleanQuotes from "./previousQuotes.json";

admin.initializeApp();

const db = admin.firestore();

Promise.all(cleanQuotes.map(insertQuote))
  .then(() => {
    console.log("Done!");
    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

async function insertQuote(quote: QuoteStorage) {
  const docRef = db.collection("quotes").doc(quote.cttId);
  const doc = await docRef.get();
  if (doc.exists) {
    return;
  }
  return docRef.set(quote);
}
