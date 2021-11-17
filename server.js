const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const usersController = require('./controllers/users')
const passport = require('passport')
const initializePassport = require('./config/passport-setup')

//* Config
initializePassport(passport)
const port = 3001

//* Middleware
app.use(passport.initialize())
app.use(cors())
app.use(express.json({extended: true}))
app.use(express.static(path.join(__dirname, "/client/build")))
app.use('/api/users', usersController)

// * Routes
app.get('*', (req,res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

//*  Start server to listen
app.listen(port, () => {
  console.log('listening on port', port)
})