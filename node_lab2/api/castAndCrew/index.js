import express from 'express';
import CandCModel from './castAndCrewModel';
import asyncHandler from 'express-async-handler';
import { NotFound } from './../../responses';

const router = express.Router();

// Get cast ands crew details
router.get('/:id', asyncHandler(async (req, res) => {
    console.log('Getting cast and crew for movie: ', req.params.id);

    // const castAndCrew = await CastAndCrewModel.findById(req.params.id).exec();
    const castAndCrew = await CandCModel.findByMovieDBId(req.params.id);
    if (castAndCrew) {
        console.log('Found cast and crew');
        res.status(200).json(castAndCrew);
    } else {
        res.status(404).json(NotFound);
        console.log('Movie not found');
    }
}));

export default router;