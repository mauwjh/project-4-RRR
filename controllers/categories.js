const express = require('express');
const router = express.Router();
const pool = require('../db')

router.get('/', async (req, res) => {
  result = await pool.query("SELECT * FROM categories")
  res.json(result)
})

module.exports = router