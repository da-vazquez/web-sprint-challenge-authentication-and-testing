const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../auth/secret")
const User = require("../users/users-model")

const restricted = async (req, res, next) => {
  try {
    const token = req.cookies.token
      if(!token) {
        res.status(401).json({message: "Token required"})
      }
  
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({message: "Token invalid"})
        }
  
        req.token = decoded
        next()
      })
  
    } catch(err) {
      next(err)
    }
}

const checkUsernameDups = (req, res, next) => {
  const username = req.body.username
  User.findBy({username}).first()
    .then(existingUser => {
      if (existingUser) {
      return res.status(401).json({message: "Username already taken"})

    } else {
      req.existingUser = existingUser
      next()
  }}
  )
}




const checkBodyValid = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      res.status(401).json({message: "Username and Password required"})
    } else {
      next()
    }
}
  
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */


module.exports = {
  restricted,
  checkUsernameDups,
  checkBodyValid
}