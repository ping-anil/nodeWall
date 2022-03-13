const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
    phone: String,
    password: String,
    privateKey:Buffer,
})


module.exports = mongoose.model('User',userSchema);