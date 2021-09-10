const express = require('express');
const User = require('../models/user');
const Post = require('../models/post');

const router = express.Router();

router.post('/addPost', async (req, res) => {
    if (!req.body.content || !req.body.id) {
        res.status(404).json({message: "empty"})
    } else {
        const existUser = await User.findOne({
            where:{
                id:req.body.id,
            }
        })
        if(!existUser) {
            res.status(403).json('없는 사람');
            return;
        }
        const createPost = await Post.create({
            content: req.body.content,
            userId: req.body.id,
        })
        res.status(201).json(createPost)
    }
})

module.exports = router;