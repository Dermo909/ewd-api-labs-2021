import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import Movie from './../movies/movieModel';
import jwt from 'jsonwebtoken';
import { NotFound, Unauthorised, CreatedResource } from './../../responses';
const router = express.Router();

// Get all users
router.get('/', asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
}));

// register a user
// router.post('/', async (req, res) => {
//     await new User(req.body).save();
//     res.status(200).json({ success: true, token: "FakeTokenForNow" });
// });

// Update a user
router.put('/:id', asyncHandler(async (req, res) => {
    if (req.body._id) delete req.body._id;
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if (user)
        res.json(200, user);
    else
        res.json(404, NotFound);
}));

// register a user (notice the asyncHandler(...)!!! )
// router.post('/', asyncHandler(async (req, res) => {
//     await new User(req.body).save();
//     res.status(200).json({ success: true, token: "FakeTokenForNow" });
// }));

// Register/login a user
router.post('/', asyncHandler(async (req, res) => {
    if (req.query.action === 'register') {
        console.log('Registering in API');
        await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        res.status(201).json(CreatedResource);
    } else {
        const user = await User.findByUserName(req.body.username);
        if (!user) return res.status(401).json(Unauthorised);
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                // if user is found and password is right create a token
                const token = jwt.sign(user.username, process.env.secret);
                // return the information including token as JSON
                res.status(200).json({
                    status_message: "Success",
                    status_code: 200,
                    token: 'BEARER ' + token,
                });
            } else {
                res.status(401).send(Unauthorised);
            }
        });

    }
}));

router.post('/:userName/favourites', asyncHandler(async (req, res) => {
    const newFavourite = req.body;
    const userName = req.params.userName;
    if (newFavourite && newFavourite.id) {
        //kick off both async calls at the same time
        const moviePromise = Movie.findById(newFavourite.id);
        const userPromise = User.findByUserName(userName);
        //wait for both promises to return before continuing
        const movie = await moviePromise;
        const user = await userPromise;
        //This wont execute until both the above promises are fulfilled.
        if (movie && user) {
            await user.addFavourite(movie._id);
            res.status(201).json(user);
        }
        else {
            res.status(404).json(NotFound);
        }
    }
    else {
        res.status(422).json({ status_code: 422, message: "unable to process body of request" });
    }
}));

router.get('/:userName/favourites', asyncHandler(async (req, res, next) => {
    const userName = req.params.userName;
    const user = await User.findByUserName(userName).populate('favourites');
    if (user)
        res.status(201).json(user.favourites);
    else
        res.status(404).json(NotFound);
}));

export default router;