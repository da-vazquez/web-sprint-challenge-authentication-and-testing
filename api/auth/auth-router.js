const router = require('express').Router()
const bcrypt = require("bcryptjs")
const db = require("../users/users-model")
const mw = require("../middleware/restricted")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require('./secret')

router.post('/register', mw.checkUsernameDups, mw.checkBodyValid, async (req, res, next) => {
  try {
    const { username, password } = req.body
    const hash = 8
    const registerUser = await db.add({
      username,
      password: await bcrypt.hashSync(password, hash),
    })
      if (registerUser) {
        res.status(200).json(registerUser)
    
    } else {
        res.status(401).json({message: "Unable to register user"})
    }
    } catch(err) {
      next(err)
    }
  })
 

router.post('/login', mw.checkBodyValid, (req, res) => {
    const { username, password } = req.body
    
    db.findBy({username}).first()
      .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
          console.log(user)
          
          const token = jwt.sign({
            userID: user.id,
            username: user.username,
            expiresIn: "30d",
          }, JWT_SECRET || "keep it secret keep it safe")

          res.cookie("token", token)
          res.status(200).json({
            message: `Welcome back ${req.body.username}`,
          })
        
      } else {
          return res.status(401).json({message: "invalid credentials"})
        }
      })
      
      .catch(err => {
        console.log(err)
        return res.status(401).json({message: "Unable to log in user..."})
      })
    })

    

  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */


module.exports = router;
