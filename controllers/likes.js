const express = require('express');
const router = express.Router();
const pool = require('../db')

router.post('/', async (req, res) => {
  result = await pool.query("INSERT INTO likes (user_id, listing_id) VALUES ($1, $2)", [req.body.user_id, req.body.listing_id])
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