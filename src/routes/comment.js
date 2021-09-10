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
        const maxGroupId = await CommentGroup.max('groupId');
        const maxCommentGroupPost = await  CommentGroup.max('order', {where:{postId:req.body.postId}})
        const t = await sequelize.transaction();
        try {
            const createCommentGroup = await CommentGroup.create({
                postId:req.body.postId,
                groupId: maxGroupId ? maxGroupId + 1 : 1,
                order:maxCommentGroupPost ? maxCommentGroupPost + 1 :1,
            },{transaction:t})
            const maxOrderId = await Comment.max('order', {where : {
                    postId:createCommentGroup.postId
                }});

            const createComment = await Comment.create({
                groupId:createCommentGroup.groupId,
                postId:req.body.postId,
                userId:req.body.userId,
                content:req.body.content,
                order:maxOrderId ? maxOrderId +1 : 1,
                class:'COMMENT'
            },{transaction:t})
            await t.commit();
            res.status(201).json({data:createComment, maxOrderId});
        }catch(e) {
            await t.rollback();
            res.status(e.status).json(e);
        }
    }
})

module.exports = router;