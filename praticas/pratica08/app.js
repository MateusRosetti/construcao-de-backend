require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config();

const usuariosRouter= require('./routes/usuariosRouter')
const usuariosRouter = require('./routes/usuariosRouter'); 
const produtosRouter = require('./routes/produtosRouter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/usuarios', usuariosRouter);
app.use('/produtos', produtosRouter);


module.exports = app;

