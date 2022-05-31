'use strict';

const express = require('express'),
  app = express();

app.get('/', (req, res) => {
  res.status(200).send('hello world').end();
});

app.listen(parseInt(process.env.PORT) || 8080, () => {
  console.log(`app started`);
});

module.exports = app;
