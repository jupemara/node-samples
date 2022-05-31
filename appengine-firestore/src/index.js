'use strict';

const express = require('express'),
  app = express(),
  { Firestore } = new require('@google-cloud/firestore'),
  firestore = new Firestore();

app.get('/', async (req, res) => {
  res.header('Content-Type', 'application/json');
  const contents = {
    path: '/',
  };
  // use firestore
  try {
    const doc = firestore.doc('test-data/1');
    contents.firestoreDoc = await doc.get();
  } catch (e) {
    console.error(`an error occurred on firestore: ${e}`);
  }
  res.status(200).send(JSON.stringify(contents, null, 2)).end();
});

app.listen(parseInt(process.env.PORT) || 8080, () => {
  console.log(`app started`);
});

module.exports = app;
