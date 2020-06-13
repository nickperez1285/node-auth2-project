const router = require('express').Router(); 
const Users = require('../users/users-model.js'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // installed this library
const secrets = require('../secrets.js')

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
			// use eq.session.user = user for creating cookie only 
			req.session.user = user 
			const token = generateToken(user)

			res.status(200).json({messsage: token})
		}
		else{
			res.status(401).json({message: "oops! wrong creds dude"})
		}

	}catch(err){
		console.log(err)
		res.status(500).json(err)

	}

})





router.post('/out', (req,res) => {

	if (req.session) {
		req.session.destroy()
		res.json({message: 'logged out'})
	
	}else{ 
		res.json({message: 'loged out'})

	}
})


function generateToken(user) {
  const payload = {
    id: user.id, // sub in payload is what the token is about
    username: user.username,
    // ...otherData
  };

  const options = {
    expiresIn: '1d', // show other available options in the library's documentation
  };

  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
}


module.exports = router 