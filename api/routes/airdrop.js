const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const web3 = require('@solana/web3.js');


const router = express.Router();

router.post('/',async function (req,res,next){

    var number = req.body.phone;
    
    User.find({phone:req.body.phone})
    .exec()
    .then(user=>{
        ;(async () =>{
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
    
    
                var privateKey = user[0].privateKey;
                var wallet = web3.Keypair.fromSecretKey(privateKey);
                var airdropSignature = await connection.requestAirdrop(wallet.publicKey, web3.LAMPORTS_PER_SOL *2, );
                var publicKey = wallet.publicKey.toString();
                var balance = "0";
                
                res.status(200).json(
                    {
                        message: 'success',
                        balance: balance,
                        publicKey: publicKey
                    }
                )
            }
        })
        })
        .catch(err=>{
            res.status(500).json({
                message: 'failed',
                error: err
            })
    })
})


module.exports = router;