import express from 'express';
import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import { NotFound } from './../../responses';
import Movie from './../movies/movieModel';

const router = express.Router();

router.get('/', async (req, res) => {

    let { page = 1, limit = 20 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    const totalDocumentsPromise = movieModel.estimatedDocumentCount(); //Kick off async calls
    const moviesPromise = movieModel.find().limit(limit).skip((page - 1) * limit);

    const totalDocuments = await totalDocumentsPromise; //wait for the above promises to be fulfilled
    const movies = await moviesPromise;

    const returnObject = { page: page, total_pages: Math.ceil(totalDocuments / limit), total_results: totalDocuments, results: movies };//construct return Object and insert into response object

    res.status(200).json(returnObject);
});

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    console.log('Getting movie id: ', req.params.id);
    const id = req.params.id;

    const movie = await movieModel.findById(id).exec();
    if (movie) {
        console.log('Found movie');
        res.status(200).json(movie);
    } else {
        res.status(404).json(NotFound);
        console.log('Movie not found');
    }
}));

router.get('/:id/reviews', asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const movie = await movieModel.findByMovieDBId(id).populate('reviews');
    if (movie)
        res.status(201).json(movie.reviews);
    else
        res.status(404).json(NotFound);
}));

router.post('/:id/reviews', asyncHandler(async (req, res) => {
    const newReview = req.body;
    const id = req.params.id;

    if (newReview && newReview.content) {
        //kick off both async calls at the same time
        const moviePromise = Movie.findById(id);
        //wait for both promises to return before continuing
        const movie = await moviePromise;

        //This wont execute until both the above promises are fulfilled.
        if (movie) {
            await movie.addReview(newReview);
            res.status(201).json(movie);
        }
        else {
            res.status(404).json(NotFound);
        }
    }
    else {
        res.status(422).json({ status_code: 422, message: "unable to process body of request" });
    }
}));
export default router;