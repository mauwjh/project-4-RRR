const express = require('express');
const router = express.Router();
const pool = require('../db')

router.post('/', async (req, res) => {
  result = await pool.query("INSERT INTO likes (user_id, listing_id) VALUES ($1, $2)", [req.body.user_id, req.body.listing_id])
  res.json(result)
})

router.get('/:id/allListings', async (req, res) => {
  result = await pool.query("SELECT listings.creator_id, listings.id, listings.title, listings.description, listings.category, listings.sale_option, listings.looking_for, listings.img, listings.price, categories.id as categories_id, categories.name as categories_name, users.username as users_username, users.email as users_email, likes.id as likes_id, likes.user_id as likes_userId, likes.listing_id as likes_listingId FROM likes JOIN listings ON likes.listing_id = listings.id JOIN categories ON categories.id = listings.category JOIN users ON users.id = listings.creator_id WHERE likes.user_id = $1", [req.params.id])
  res.json(result)
})

router.get('/mostLiked/:limit', async (req, res) => {
  result = await pool.query("SELECT users.username as users_username, likes.listing_id as id, listings.title, listings.creator_id, listings.sale_option, listings.img, listings.category, categories.name as categories_name, COUNT(likes.listing_id) as likes from likes JOIN listings ON likes.listing_id = listings.id JOIN categories ON listings.category = categories.id JOIN users ON users.id = listings.creator_id GROUP BY listing_id, listings.title, listings.creator_id, listings.sale_option,listings.category,categories.name, listings.img, users_username ORDER BY COUNT(listing_id) DESC LIMIT $1", [req.params.limit])
  res.json(result)
})

router.get('/:id', async (req, res) => {
  result = await pool.query("SELECT * FROM likes WHERE user_id = $1", [req.params.id])
  res.json(result)
})

router.get('/listing/:id', async (req, res) => {
  result = await pool.query("SELECT * FROM likes WHERE listing_id = $1", [req.params.id])
  res.json(result)
})

router.delete('/delete', async (req, res) => {
  result = await pool.query("DELETE FROM likes WHERE user_id = $1 AND listing_id = $2", [req.body.user_id, req.body.listing_id])
  res.json(result)
})

module.exports = router