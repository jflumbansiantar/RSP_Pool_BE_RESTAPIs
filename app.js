const express = require('express');
const fs = require('fs');
require('dotenv').config();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const errHandler = require('./middlewares/errorHandling')
const auth = require('./middlewares/auth')
const app = express();
const PORT = process.env.PORT || 5000;
const router = require('./routes')

//Middlewares

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Routes
app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT}`);
})

app.use(auth);