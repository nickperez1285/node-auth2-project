const router = require("express").Router();
const bcrypt = require('bcryptjs');
const Users = require("./user-model.js");
const jwt = require('jsonwebtoken'); // installed this library
const secrets = require('../config/secrets.js')

const restricted = require('../auth/middleware.js')


// add in resricted to route
router.get("/users", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.send(err));
});

router.post('/register',async (req,res) => {
	let user = req.body
	const hash = bcrypt.hashSync(user.password, 12)
	user.password = hash

	try{
		const saved = await Users.add(user)
		res.status(201).json(saved)

	} catch(err){
		console.log(err);
		res.status(500).json(err)
	}
}
)

router.post('/login',async (req,res) => {
	let {username, password} = req.body

	try{
		const user = await Users.findBy({username}).first()
		if( user && bcrypt.compareSync(password, user.password )){
			// req.session.user = user 
			const token = generateToken(user)
			res.status(200).json({messsage: `Welcome ${user.username}!, have a token...`
          , token  })
		}
		else{
			res.status(401).json({message: "oops! wrong creds"})
		}

	}catch(err){
					console.log(err)

		res.status(500).json(err)

	}

})

function generateToken(user) {
  const payload = {
    subject: user.id, // sub in payload is what the token is about
    username: user.username,
    // ...otherData
  };

  const options = {
    expiresIn: '1d', // show other available options in the library's documentation
  };

  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
}


module.exports = router;

// todo : add last routes, add in authenticatoon , 