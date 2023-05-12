const jwt = require("jsonwebtoken")

module.exports = {
  createToken: (payload) => {
    return jwt.sign(payload, process.env.TOKEN_KEY,{
      expiresIn: process.env.TOKEN_EXP
    })
  }
}