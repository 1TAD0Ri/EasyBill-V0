const mongoose = require('mongoose');
require('dotenv').config();


const db = process.env.db;
const username = process.env.ATLAS_USERNAME;
const pw = process.env.ATLAS_PASSWORD;




// ! Don't forget to change the String
const uri = `mongodb+srv://${username}:${pw}@cluster0.nszfij2.mongodb.net/${db}?retryWrites=true&w=majority`;

mongoose.connect(uri)
.then(()=>console.log("connection whith db",db))
.catch(()=>console.log("cannot connect to db",db));