const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const web3 = require('@solana/web3.js');


const router = express.Router();



router.post('/', async (req,res,next)=>{

    var number = req.body.phone;
    var password = req.body.password;
    
    User.find({phone:req.body.phone})
    .exec()
    .then(async user=>{
        if(user.length<1){
            return res.status(401).json({
                message: "user not found"
            })
        }else if(req.body.password == user[0].password){
            
            // Connect to cluster
            var connection = new web3.Connection(
                web3.clusterApiUrl('devnet'),
                'confirmed',
            );

            var _privateKey = user[0].privateKey;
            var _secretKey = new Uint8Array(_privateKey.buffer);
                   
            var wallet = web3.Keypair.fromSecretKey(_secretKey);
                
            // var wallet = web3.Keypair.fromSecretKey(s);
           
            var balance = await connection.getBalance(wallet.publicKey)

            console.log(user[0].privateKey);
            
            const token = jwt.sign(
                {phone : user[0].phone},
                'some key text', 
                { expiresIn:"100h" }
             );

            res.status(200).json(
                {
                    message: 'success',
                    token: token,
                    user: user[0],
                    balance: balance,
                    publicKey: wallet.publicKey.toString()
                }
            )
        }
        })
        .catch(err=>{
            res.status(500).json({
                message: 'failed',
                error: err.body
            })
    })
})


module.exports = router;