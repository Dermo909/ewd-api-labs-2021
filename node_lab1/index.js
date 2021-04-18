import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';

dotenv.config();

const swaggerDocument = yaml.load(fs.readFileSync('./../movie-api-yaml/swagger.yaml', 'utf8'));
console.log(swaggerDocument);
const app = express();

const port = 8080; //process.env.PORT;

app.use(express.json());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/movies', moviesRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});