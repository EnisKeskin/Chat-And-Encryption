const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/kriptoloji',
        { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true });
        
    mongoose.connection.on('open', () => {
        console.log('MongDB: Connected');
    });
    mongoose.connection.on('error', (err) => {
        console.log('MongDB: Error ' + err);
    });

    mongoose.Promise = global.Promise;

} 
