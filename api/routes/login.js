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
            // console.log(_privateKey);
            // let _secretKey = new Uint8Array("[1,2,3]");
            // console.log(_secretKey);

            // let _secretKey2 =  Uint8Array.from([175,216,228,31,184,239,162,237,116,25,123,148,45,65,72,235,238,157,80,195,128,160,1,69,39,213,165,152,44,59,158,31,245,74,231,2,112,117,176,47,233,15,176,140,86,53,217,141,43,177,181,206,129,152,50,12,32,94,194,203,87,138,48,114]);
            // console.log(_secretKey2);

            var array = JSON.parse("[" + _privateKey + "]");
            let _secretKey3 =  Uint8Array.from(array);       
            var wallet = web3.Keypair.fromSecretKey(_secretKey3);
           
            var airdropSignature = await connection.requestAirdrop(wallet.publicKey, web3.LAMPORTS_PER_SOL , );

            var balance = await connection.getBalance(wallet.publicKey)
            console.log("private key : "+wallet.publicKey.toString());
            console.log("public key : "+wallet.secretKey.toString());
            console.log(" : "+balance);

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