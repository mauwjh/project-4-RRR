const express = require('express');
const jwtGenerator = require('../utils/jwtGenerator')
const passport = require('passport')
const router = express.Router();
const pool = require('../db')
const bcrypt = require('bcrypt')
require('dotenv').config()

//* Routes

router.post('/login', passport.authenticate('local'), async (req,res) => {
  try{
    const token = jwtGenerator(req.user.id, req.user.username, req.user.email)
    res.json(token)
  } catch (error) {
    console.log(error)
    res.json({message: 'error'})
  }
})

router.get('/logout', async (req,res) => {

})

router.get('/authenticate', passport.authenticate('jwt'), async (req,res) => {
  try{
    res.json({message: `Great! ${req.user.username}`})
  } catch (error) {
    console.log(error)
    res.json({message: 'error'})
  }
})

router.post('/new', async(req,res) => {
  const {username, password, email} = req.body
  hash = bcrypt.hashSync(
    password,
    bcrypt.genSaltSync(10)
  )
  const createUser = await pool.query("INSERT INTO users (username, password, email) VALUES ($1, $2, $3)", [username, hash, email])
  res.json({message: 'User created'})
})

module.exports = router