const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const usersController = require('./controllers/users')
const categoriesController = require('./controllers/categories')
const listingsController = require('./controllers/listings')
const likesController = require('./controllers/likes')
const passport = require('passport')
const initializePassport = require('./config/passport-setup')

//* Config
initializePassport(passport)
const port = process.env.PORT ?? 3001

//* Middleware
app.use(passport.initialize())
app.use(cors())
app.use(express.json({extended: true}))
app.use(express.static(path.join(__dirname, "/client/build")))
app.use('/api/users', usersController)
app.use('/api/categories', categoriesController)
app.use('/api/listings', listingsController)
app.use('/api/likes', likesController)

// * Routes
app.get('*', (req,res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

//*  Start server to listen
app.listen(port, () => {
  console.log('listening on port', port)
})