const passport = require('passport')

exports.tokenCheck = (req,res,next) => {
  passport.authenticate('jwt', (err, user,info) => {
    if(err) {
      return res.json(err)
    }
    if(!user) {
      return res.json({authenticated: false, message: 'invalid token'})
    }
    req.user = user
    next()
  })(req,res,next)
}

exports.loginCheck = (req,res,next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) {
      return res.json(err)
    }
    if(!user) {
      return res.json({...info})
    }
    req.user = user
    next()
  })(req,res,next)
}