import express from 'express';
import dotenv from 'dotenv';
import logger from './logger.js';
import morganMiddleware from './middlewares/morganMiddleware.js';

dotenv.config();

const app = express();
const port = 3000;

app.use(morganMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/error', (req, res) => {
  logger.error('Error message');
  res.sendStatus(500);
});

app.listen(port, () => {
  logger.info('Server listening on port 3000');
});
