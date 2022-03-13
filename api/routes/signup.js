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
//   let account = await connection.getAccountInfo(wallet.publicKey);
  var balance = await connection.getBalance(wallet.publicKey);
console.log(wallet.secretKey.toString());

    // saving user
    const a = new User({
    userId: new mongoose.Types.ObjectId,
    phone: req.body.phone,
    password: req.body.password,
    privateKey:wallet.secretKey.toString(),
    });

    a.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message: "success",
            user: result,
            balance: balance,
            balance: balance,
            publicKey: wallet.publicKey.toString()
        })
    })

    .catch(err=>{
        console.log()
        res.status(500).json({
            message: "failue",
            errro:err,
            user: result
        })
    })
   

})


module.exports = router;