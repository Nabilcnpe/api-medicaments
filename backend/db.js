const mongoose = require('mongoose');
const config = require('./src/config/config');

//DB
const dbConnect = () => {
    mongoose.connect(
        config.db.url,
        { useNewUrlParser: true, useUnifiedTopology: true }, () => {
            console.log(`Connected to db`);
        })
}

const dbClose = () => {
    mongoose.connection.close(() => {
        console.log("Connection has been successfully closed, see you again soon!");
    })
}

const dbDropCollection = (collection) => {
    mongoose.connection.dropCollection(collection, (err, res) => {
        if (err) throw Error(err);
        console.log(`${collection} collection droped`);
    });
}

module.exports = { dbConnect, dbClose, dbDropCollection }
