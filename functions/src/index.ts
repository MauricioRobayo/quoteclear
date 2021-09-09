import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

export const randomQuote = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  const snapshot = await db.collection("quotes").get();
  const randomQuote =
    snapshot.docs[Math.floor(Math.random() * snapshot.docs.length)];
  functions.logger.log("quote:", randomQuote.data());
  res.json(randomQuote.data());
});
