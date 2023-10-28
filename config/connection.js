// mongodb connect
const mongoose = require('mongoose');

// mongoose.connect('mongodb://0.0.0.0:27017/Keys');
mongoose.connect('mongodb://127.0.0.1:27017/echo-cart')
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))  