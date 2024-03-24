const express = require('express');
const cors = require('cors');
const cookiParser = require('cookie-parser');
require('dotenv').config();
const app = express();
// const session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiParser())
app.use(cors({origin:'http://localhost:5173', credentials:true, methods:['GET', 'POST',"PUT","PATCH","DELETE"]}));
// app.use(session({
//     secret: 'fo9ma',
//     resave: false,
//     saveUninitialized: true,
// }));
require('./config/mongoose');
require('./routes/route')(app);

app.listen(process.env.port, () => {
    console.log('Server running on Port', process.env.port,"and db ",process.env.db);
});