const express = require('express');
const User = require('../models/user');
const Post = require('../models/post');
const CommentGroup = require('../models/commentGroup');
const Comment = require('../models/comment');
const {sequelize} = require("../models");

const router = express.Router();

router.post('/addComment', async (req, res) => {
    if (!req.body.postId || !req.body.userId || !req.body.content) {
        res.status(404).json({message: "empty"});
    } else {
        const existUser = await User.findOne({
            where:{
                id:req.body.userId
            }
        })
        if(!existUser) {
            res.status(403).json('없는사람');
            return;
        }
        const existPost = await Post.findOne({
            where:{
                id:req.body.postId
            }
        })
        if(!existPost){
            res.status(403).json('없는글');
            return;
        }
            const createComment = await Comment.create({
                postId:req.body.postId,
                userId:req.body.userId,
                content:req.body.content,
            })
            if(createComment) {
                res.status(201).json({data:createComment});
            } else {
                res.status(500).json({data:"실패"})
            }
    }
})

router.post('/addReply', async (req, res) => {
    if (!req.body.postId || !req.body.userId || !req.body.content || !req.body.parentId) {
        res.status(404).json({message: "empty"});
    } else {
        const existUser = await User.findOne({
            where:{
                id:req.body.userId
            }
        })
        if(!existUser) {
            res.status(403).json('없는사람');
            return;
        }
        const existPost = await Post.findOne({
            where:{
                id:req.body.postId
            }
        })
        if(!existPost){
            res.status(403).json('없는글');
            return;
        }

        const existComment = await Comment.findOne({
            where:{
                postId:req.body.postId,
                id:req.body.parentId,
            }
        })
        if(!existComment) {
            res.status(403).json({data: "없는 댓글"})
            return;
        }
            const createComment = await Comment.create({
                parentId:req.body.parentId,
                postId:req.body.postId,
                userId:req.body.userId,
                content:req.body.content,
                // order:maxOrderId ? maxOrderId +1 : 1,
                // class:'REPLY'
            })
            if(createComment) {
                res.status(201).json({data:createComment,existComment});
            } else {
                res.status(500).json({data:"실패"})
            }
        }
})

router.post('/allComment',async (req,res) => {
    if(!req.body.postId) {
        res.status(404).json({body: 'empty'})
    } else {
        const comment = await Comment.findAll({
            where:{
                postId:req.body.postId,
                parentId:null
            }
        })
        if(comment) {
            res.json(comment)
        } else {
            res.status(404).json({data:'empty'})
        }
    }
})

router.post('/replyComment',async (req,res) => {
    if(!req.body.postId || !req.body.parentId) {
        res.status(404).json({body: 'empty'})
    } else {
        const comment = await Comment.findAll({
            where:{
                postId:req.body.postId,
                parentId:req.body.parentId
            }
        })
        if(comment) {
            res.json(comment)
        } else {
            res.status(404).json({data:'empty'})
        }
    }
})

module.exports = router;