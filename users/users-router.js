const router = require('express').Router(); 
const Users = require("./users-model.js");
const restrict = require('../auth/middleware.js')
const jwt = require('jsonwebtoken'); // installed this library
const secrets = require('../secrets.js')



router.get("/users", restrict ,  (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.send(err));
});


function validateToken() {
    //verify that the user is logged in
    return async (req, res, next) =>{
    	const { token } = req.cookies
			    if(token) {
			        jwt.verify(token, secret, (error, decodedToken) => {
			            if(error) {
			                res.status(401).json({message: "Invalid credentials"})
			            } else {
			                //if the token is good
			                req.jwt = decodedToken;
			                next();
			            }
			        })
			    } else {
			        res.status(400).json({message: "Please include your token."})
			    }
}
}

module.exports = router