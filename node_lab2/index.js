import './api/db';
import './seedData';
import express from 'express';
import moviesRouter from './api/movies';
import genresRouter from './api/genres';
import usersRouter from './api/users';
import reviewsRouter from './api/reviews';
import castAndCrewRouter from './api/castAndCrew';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import 'dotenv/config';
import { ServerError } from './responses';
import passport from './api/authenticate';

// Demo version
const app = express();
const port = process.env.PORT;
const swaggerDocument = yaml.load(fs.readFileSync('./../movie-api-yaml/swagger.yaml', 'utf8'));

const errorHandler = (err, req, res, next) => {
  ServerError.status_message = err.message;
  res.status(500).json(ServerError);
  next();
};

app.use(express.json());

// initialise passport
app.use(passport.initialize());
// Add passport.authenticate(..)  to middleware stack for protected routes​
app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);

//app.use('/api/movies', moviesRouter);
app.use('/api/genres', genresRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler);
//Users router
app.use('/api/users', usersRouter);

// Cast and crew
app.use('/api/castAndCrew', castAndCrewRouter);


app.use('/api/reviews', reviewsRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});