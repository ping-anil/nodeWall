const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
    phone: String,
    password: String,
    privateKey:String,
    publicKey:String,
    balance: String
})


module.exports = mongoose.model('User',userSchema);