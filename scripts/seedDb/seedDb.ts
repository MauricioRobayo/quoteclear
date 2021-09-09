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

function insertQuote(quote: QuoteStorage) {
  return db.collection("quotes").doc(quote.cttId).set(quote);
}
