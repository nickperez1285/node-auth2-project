const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const brcypt = require('bcryptjs'); 
const session = require('express-session')
const knexSessionConnect = require('connect-session-knex')
const users = require('../users/user-routes')
const server = express();


const knexStore = knexSessionConnect(session)

const sessionConfig = {
	name  : 'seshcook', // name of cookie 
 	secret : 'whatever you want' , 
cookies :{
	maxAge : 1000 * 500 ,// life of cookie 
	server : false , // true production . Makes it so only can use HTTPs or not 
	http: true , // cookie cannot be accesses with javactip 

}, 
resave: false, // recreates session if not save 
saveUninitialize: false ,// legalal compliance , true on production 
store: new knexStore({ // saves cookie acceessiability info , waraaps session in knex connect 
	knex:require('../data/dbConfig.js'), // link to databaase knew config gfile 
	tablename: "sessions",
	createtable: true, 
	clearInterval : 1000*100*100
})
}

server.use(session(sessionConfig))

server.use('/api', users)
server.get("/", (req, res) => {
  res.json({ message: "running" });
});
module.exports  = server 