

require("dotenv").config();

const express = require('express');

const server = express()

const port = process.env.PORT || 5000;

const users = require('./api/server')

server.use(express.json());

server.use('/', users)


server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));

module.exports = server;


