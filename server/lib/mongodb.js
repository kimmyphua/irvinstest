const mongoose = require("mongoose");
require('dotenv').config()

mongoose.connect("mongodb+srv://kimmyphua:acess123@cluster0.te8qa.mongodb.net/irvins?retryWrites=true&w=majority", {
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("mongodb running")
})

module.exports = mongoose
