import express from 'express';
import { genreModel } from './genreModel';

const router = express.Router();
router.get('/', async (req, res) => {
    //res.status(200).json(genres);
    let { page = 1, limit = 4 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    const totalDocumentsPromise = genreModel.estimatedDocumentCount(); //Kick off async calls
    const moviesPromise = genreModel.find().limit(limit).skip((page - 1) * limit);

    const totalDocuments = await totalDocumentsPromise; //wait for the above promises to be fulfilled
    const movies = await moviesPromise;

    const returnObject = { page: page, total_pages: Math.ceil(totalDocuments / limit), total_results: totalDocuments, results: movies };//construct return Object and insert into response object

    res.status(200).json(returnObject);
});

export default router;