import express from 'express';
import reviewModel from './reviewModel';
import asyncHandler from 'express-async-handler';
import { NotFound } from './../../responses';

const router = express.Router();

router.get('/:id', asyncHandler(async (req, res) => {
    console.log('Getting reviews for movie: ', req.params.id);

    const review = await reviewModel.find({movieId: req.params.id});
    if (review) {
        console.log('Found review: ', review);
        res.status(200).json(review);
    } else {
        res.status(404).json(NotFound);
    }
}));

export default router;