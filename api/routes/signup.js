const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const web3 = require('@solana/web3.js');
const router = express.Router();
const User = require('../model/user');
const mongoose = require('mongoose');




router.post('/',async function (req,res,next){

    // wallet creation
// Connect to cluster
var connection = new web3.Connection(
    web3.clusterApiUrl('devnet'),
    'confirmed',
  );
  // Generate a new wallet keypair 
    var wallet = web3.Keypair.generate();
    var airdropSignature = await connection.requestAirdrop(wallet.publicKey, web3.LAMPORTS_PER_SOL *2, );
             
    var accountBalance = await connection.getBalance(wallet.publicKey);

    // saving user
    const userData = new User({
        userId: new mongoose.Types.ObjectId,
        phone: req.body.phone,
        password: req.body.password,
        privateKey:wallet.secretKey.toString(),
        publicKey:wallet.publicKey.toString(),
        balance: accountBalance.toString()
    });

    userData.save()
    .then(result=>{
        res.status(200).json({
            message: "success",
            user: result,
            publicKey: wallet.publicKey.toString()
        })
        console.log("success");
    })
    .catch(err=>{
        console.log(err.message);
        res.status(500).json({
            message: "failure",
            errro:err
        })
    })
   

})


module.exports = router;