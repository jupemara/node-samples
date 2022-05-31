'use strict';

const express = require('express'),
  app = express(),
  { Firestore } = require('@google-cloud/firestore'),
  firestore = new Firestore(),
  { initializeApp, applicationDefault } = require('firebase-admin/app'),
  { getFirestore } = require('firebase-admin/firestore');

app.get('/', async (req, res) => {
  res.header('Content-Type', 'application/json');
  const contents = {
    path: '/',
  };
  // use cloud firestore sdk
  try {
    const doc = firestore.doc('test-data/1');
    contents.byCloudSdk = await doc.get();
  } catch (e) {
    console.error(`an error occurred on firestore: ${e}`);
  }
  // use firebase admin
  try {
    initializeApp({
      credential: applicationDefault(),
    });
    const db = getFirestore();
    const ref = db.collection('test-data').doc('1');
    contents.byFirebaseAdmin = await ref.get();
  } catch (e) {
    console.error(`an error occurred on firebase-admin: ${e}`);
  }

  res.status(200).send(JSON.stringify(contents, null, 2)).end();
});

app.listen(parseInt(process.env.PORT) || 8080, () => {
  console.log(`app started`);
});

module.exports = app;
