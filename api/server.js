const express = require("express");
const server = express();
const cors = require("cors");
const brcypt = require('bcryptjs'); 
const authRouter = require('../auth/auth-router.js')
const usersRouter = require("../users/users-router.js");

// 
const helmet = require("helmet");
const expSession = require('express-session')
const knexSeshConnect = require('connect-session-knex')
const knexSessionStore = knexSeshConnect(expSession)


const sessionConfig = {
	name  : 'session-cookie', // name of cookie 
 	secret : 'my secret' , 
	cookies :{
		maxAge : 1000 * 500 ,// life of cookie 
		server : false , // true production . Makes it so only can use HTTPs or not 
		http: true , // cookie cannot be accesses with javactip 

	}, 
	resave: false, // recreates session if not save 
	saveUninitialized: false ,// legalal compliance , true on production 
	store: new knexSessionStore({ // saves cookie acceessiability info 
		knex:require('../data/dbConfig.js'), 
		tablename: "sessions",
		createtable: true, 
	clearInterval : 1000*100*100
})
}
server.use(expSession(sessionConfig))
server.use(helmet());
// 


server.use(express.json());
server.use(cors());


server.use("/", usersRouter);
server.use('/', authRouter)



server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
