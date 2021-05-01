import express from 'express';
import { Genre } from './genreModel';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    console.log('genre', Genre);
    const genresPromise = await Genre.find();
    const genres = await genresPromise;
    res.status(200).json(genres);
}));

export default router;