const express = require('express');
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const errHandler = require('./middlewares/errorHandling')
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const router = require('./routes')

//Middlewares

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Routes
app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT}`);
})
