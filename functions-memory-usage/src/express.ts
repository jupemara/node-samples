import express from 'express';
import { fn } from '.';

(() => {
  express()
    .get('/', fn)
    .listen(3000, () => {
      console.log('listening on 3000');
    });
})();
