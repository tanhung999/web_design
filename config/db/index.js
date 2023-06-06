const mongoose = require('mongoose');

async function connect (){
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/cameras',{
            useNewUrlParser: true,
            useUnifiedTopology: true

        });
        console.log("Connected successfully");
    } catch (err) {
        console.error(err);
    }
};

// 

module.exports = {connect};