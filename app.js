const { response } = require("express");
const express = require("express");
const web3 = require('@solana/web3.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb+srv://unite_anil:Qwerty123@cluster0.igrwc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

mongoose.connection.on('error',err =>{
    console.log('Connection to mongo atlas failed');
});

mongoose.connection.on('connected',connected =>{
    console.log('Connection to mongo atlas successfull');
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const req = require("express/lib/request");
const res = require("express/lib/response");


const loginRoute = require('./api/routes/login')
app.use('/login',loginRoute)

const signupRoute = require('./api/routes/signup');
app.use('/signup',signupRoute)


app.use((req,res,next) => {
    res.status(404).json({
        message: 'Failure',error: 'Bad Request. Check url' 
    })
})

// app.use((req,res,next) => {
//     res.status(200).json({
//         message: 'app is running here eeeeeeee'
//     })
// })

// ;(async () => {
//     // Connect to cluster
//     var connection = new web3.Connection(
//       web3.clusterApiUrl('devnet'),
//       'confirmed',
//     );
  
//     // Generate a new wallet keypair and airdrop SOL
//     var wallet = web3.Keypair.generate();



//     // var airdropSignature = await connection.requestAirdrop(
//     //   wallet.publicKey,
//     //   web3.LAMPORTS_PER_SOL *2,
//     // );
  
//     //wait for airdrop confirmation
//     // await connection.confirmTransaction(airdropSignature);
  
//     // get account info
//     // account data is bytecode that needs to be deserialized
//     // serialization and deserialization is program specific
//     let account = await connection.getAccountInfo(wallet.publicKey);
//     console.log("account");
//     console.log(account);

//     console.log("wallet");
//     console.log(wallet);
//     console.log("Pub key");
    
//     console.log(wallet.publicKey.toString());
//     console.log("pvt key");
//     console.log(wallet.secretKey.toString());

//     var sk = wallet.secretKey.toString()
//     console.log("sk");
//     console.log(sk);
 

//     var array = new Uint8Array(sk);
//     // var wall = web3.Keypair.fromSecretKey(sk);
//     console.log(array);

//     var enc = new TextEncoder(); // always utf-8
//     console.log("----");
//     console.log("----");
//     console.log("----");
//     console.log("----");
//     console.log("----");
//     console.log("----");
// console.log(enc.encodeInto(sk,array));


// var uint8array = new TextEncoder("utf-8").encode(sk);
// var string = new TextDecoder("utf-8").decode(uint8array);

// console.log("####");
// console.log(string);
// console.log("####");
// console.log(uint8array);



//     console.log("balance");
//     var balance = await connection.getBalance(wallet.publicKey);
//     console.log(balance);


//     var airdropSignature = await connection.requestAirdrop(
//         wallet.publicKey,
//         web3.LAMPORTS_PER_SOL,
//       );

      

//       console.log("balance");
//       var s = await connection.getAccountInfo(wallet.publicKey);
//       var balance = await connection.getBalance(wallet.publicKey);
//     //   await sleep(5000);
//     //   var balance = await connection.getBalance(wallet.publicKey);
//     //   console.log(balance);

//     console.log("system");

  



    
//   })();


module.exports = app;