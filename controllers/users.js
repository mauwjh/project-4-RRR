const express = require('express');
const jwtGenerator = require('../utils/jwtGenerator')
const passport = require('passport')
const router = express.Router();
const pool = require('../db')
const bcrypt = require('bcrypt');
const {tokenCheck, loginCheck} = require('../config/auth');
require('dotenv').config()

//* Routes

router.post('/login', loginCheck, async (req,res) => {
  try{
    const token = jwtGenerator(req.user.id, req.user.username, req.user.email)
    res.json({token: token, authenticated: true})
  } catch (error) {
    console.log(error)
    res.json({message: 'error'})
  }
})

router.get('/logout', async (req,res) => {

})

router.get('/authenticate', tokenCheck, async (req,res) => {
  try{
    res.json({authenticated: true, username: req.user.username})
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
  const checkUsername = await pool.query("SELECT * FROM users WHERE username = $1", [username])
  const checkEmail = await pool.query("SELECT * FROM users WHERE email = $1", [email])
  if(checkUsername.rows.length > 0) {
    res.json({success: false, message: 'Username already exists'})
  } else if (checkEmail.rows.length > 0) {
    res.json({success: false, message: 'Email already exists'})
  } else {
    const createUser = await pool.query("INSERT INTO users (username, password, email) VALUES ($1, $2, $3)", [username, hash, email])
    res.json({success: true, message: 'User created'})
  }
})

module.exports = router