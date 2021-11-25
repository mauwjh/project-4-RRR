const express = require('express');
const router = express.Router();
const pool = require('../db')

router.get('/recent', async (req, res) => {
  try{
    result = await pool.query("SELECT listings.creator_id, listings.id, listings.title, listings.description, listings.category, listings.sale_option, listings.looking_for, listings.img, listings.price, categories.id as categories_id, categories.name as categories_name, users.username as users_username, users.email as users_email FROM listings JOIN categories ON categories.id = listings.category JOIN users ON users.id = listings.creator_id ORDER BY listings.id DESC LIMIT 9")
    res.json(result)
  } catch(error) {
    console.log(error)
  }
})

router.get('/user/:id', async (req, res) => {
  try{
    result = await pool.query("SELECT listings.creator_id, listings.id, listings.title, listings.description, listings.category, listings.sale_option, listings.looking_for, listings.img, listings.price, categories.id as categories_id, categories.name as categories_name, users.username as users_username, users.email as users_email FROM listings JOIN categories ON categories.id = listings.category JOIN users ON users.id = listings.creator_id WHERE listings.creator_id = $1", [req.params.id])
    res.json(result)
  } catch(error) {
    console.log(error)
  }
})

router.get('/:id', async (req, res) => {
  try{
    result = await pool.query("SELECT listings.creator_id, listings.id, listings.title, listings.description, listings.category, listings.sale_option, listings.looking_for, listings.img, listings.price, categories.id as categories_id, categories.name as categories_name, users.username as users_username, users.email as users_email FROM listings JOIN categories ON categories.id = listings.category JOIN users ON users.id = listings.creator_id WHERE listings.id = $1", [req.params.id])
    res.json(result)
  } catch(error) {
    console.log(error)
  }
})

router.get('/categories/:id/:limit', async (req, res) => {
  if(req.params.id === 'recent') {
    result = await pool.query("SELECT listings.creator_id, listings.id, listings.title, listings.description, listings.category, listings.sale_option, listings.looking_for, listings.img, listings.price, categories.id as categories_id, categories.name as categories_name, users.username as users_username, users.email as users_email FROM listings JOIN categories ON categories.id = listings.category JOIN users ON users.id = listings.creator_id ORDER BY listings.id DESC LIMIT $1", [req.params.limit])
  } else if(req.params.id === 'liked') {
    result = await pool.query("SELECT users.username as users_username, likes.listing_id as id, listings.title, listings.creator_id, listings.sale_option, listings.img, listings.category, categories.name as categories_name, COUNT(likes.listing_id) as likes from likes JOIN listings ON likes.listing_id = listings.id JOIN categories ON listings.category = categories.id JOIN users ON users.id = listings.creator_id GROUP BY listing_id, listings.title, listings.creator_id, listings.sale_option,listings.category,categories.name, listings.img, users_username ORDER BY COUNT(listing_id) DESC LIMIT $1", [req.params.limit])
  } else {
    result = await pool.query("SELECT listings.creator_id, listings.id, listings.title, listings.description, listings.category, listings.sale_option, listings.looking_for, listings.img, listings.price, categories.id as categories_id, categories.name as categories_name, users.username as users_username, users.email as users_email FROM listings JOIN categories ON categories.id = listings.category JOIN users ON users.id = listings.creator_id WHERE categories.id = $1 ORDER BY listings.id DESC LIMIT $2", [req.params.id, req.params.limit])
  }
  res.json(result)
})

router.put('/edit/:id', async (req, res) => {
  result = await pool.query("UPDATE listings SET (title, description, category, sale_option, looking_for, img, price, creator_id) = ($1, $2, $3, $4, $5, $6, $7, $8) WHERE listings.id = $9", [req.body.title, req.body.description, req.body.category, req.body.saleOption, req.body.lookingFor, req.body.img, req.body.price, req.body.creatorId, req.params.id])
  res.json(result)
})

router.post('/', async (req, res) => {
  try{
    result = await pool.query("INSERT INTO listings (title, description, category, sale_option, looking_for, img, price, creator_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id", [req.body.title, req.body.description, req.body.category, req.body.saleOption, req.body.lookingFor, req.body.img, req.body.price, req.body.creatorId])
    res.json(result)
  } catch(error) {
    console.log(error)
  }
})

router.delete('/:id', async (req,res) => {
  result = await pool.query("DELETE FROM listings WHERE listings.id = $1", [req.params.id])
  res.json(result)
})

module.exports = router