const express = require('express');
const User = require('../models/user');
const bcrypt = require("bcrypt");

const router = express.Router();

router.post('/signup', async (req,res) => {
    if(!req.body.login_id && !req.body.password && !req.body.nickname) {
        res.status(404).json({message:"body"});
    } else {
        const existUser = await User.findOne({
            where:{
                login_id: req.body.login_id
            }
        })
        if(existUser) {
            res.status(403).json('이미 있는 이메일');
           return;
        }
        const hashPassword = await bcrypt.hash(req.body.password,10);
        const createUser = await User.create({
            login_id:req.body.login_id,
            password:hashPassword,
            nickname:req.body.nickname
        })
        res.status(201).json({user: createUser})
    }
})
module.exports = router;