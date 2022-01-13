require('dotenv').config();

const express = require('express');
const Server = require('./models/server');
const server = new Server();

//app.use('/public', express.static(`${__dirname}/storage/imgs`))

server.listen();
