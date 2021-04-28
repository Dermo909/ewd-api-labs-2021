import express from 'express';
import User from './userModel';
import { NotFound } from './../../responses';
import asyncHandler from 'express-async-handler';
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
router.post('/', asyncHandler(async (req, res) => {
    await new User(req.body).save();
    res.status(200).json({ success: true, token: "FakeTokenForNow" });
}));
export default router;