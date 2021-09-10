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
            throw new Error('없는 회원입니다.');
        }
        const createPost = await Post.create({
            content: req.body.content,
            UserId: req.body.id,
        })
        res.status(201).json(createPost)
    }
})

module.exports = router;