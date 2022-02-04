const express = require('express');

// importing routes and middleware


const errorMiddleWare = require('./middleware/error');
const user = require('./routes/users');
const cookieParser = require('cookie-parser');



const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/users",user);

module.exports = app;