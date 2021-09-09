import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { getCttIds, getQuoteText } from "./scraper";
import { QuoteStorage } from "./types";

admin.initializeApp();

const db = admin.firestore();

const log = functions.logger.log;
const errLog = functions.logger.error;

export const randomQuote = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  const snapshot = await db.collection("quotes").get();
  const randomQuote =
    snapshot.docs[Math.floor(Math.random() * snapshot.docs.length)];
  functions.logger.log("quote:", randomQuote.data());
  res.json(randomQuote.data());
});

export const getLatestQuotes = functions.pubsub
  .schedule("every friday 17:00")
  .timeZone("America/New_York") // default is America/Los_Angeles
  .onRun(async () => {
    const cttIds = await getCttIds();
    log(`Got ${cttIds.length} cttIds`);

    const quotesPromises: Promise<QuoteStorage | null>[] = cttIds.map(
      async ({ cttId, source }) => {
        try {
          const text = await getQuoteText(cttId);

          const quote = {
            cttId,
            text,
            source,
          };

          await db.collection("quotes").doc(quote.cttId).set(quote);

          log(`Inserted '${cttId}' into database.`);

          return quote;
        } catch (err) {
          errLog(`Failed to get text for cttId '${cttId}'`, err);
          return null;
        }
      }
    );

    await Promise.all(quotesPromises);
  });
