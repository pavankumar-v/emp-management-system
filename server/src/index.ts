import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { env } from "./config/env.config"
import { AppDataSource } from "./data-source"
import router from './routes';
import httpExceptionMiddleware from './middlewares/http-exception.middleware';

const app = express();

app.use(cors({
  origin: env.CORS_ORIGIN,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// prefix all routes with /api
app.use('/api', router);

// handle all 400, 500 errors
app.use(httpExceptionMiddleware);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);

  // connect to database
  AppDataSource.initialize().then(async () => {
    console.log("Database connected")
  }).catch(error => console.log(error))
});
