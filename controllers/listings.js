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

router.get('/categories/:id/:limit', async (req, res) => {
  result = await pool.query("SELECT listings.creator_id, listings.id, listings.title, listings.description, listings.category, listings.sale_option, listings.looking_for, listings.img, listings.price, categories.id as categories_id, categories.name as categories_name FROM listings JOIN categories ON categories.id = listings.category WHERE categories.id = $1 ORDER BY listings.id DESC LIMIT $2", [req.params.id, req.params.limit])
  res.json(result)
})

module.exports = router