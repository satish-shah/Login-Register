//Set up mongoose connection
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/YourDB", { useNewUrlParser: true }, {useCreateIndex: true});
mongoose.Promise = global.Promise;
module.exports = mongoose;
