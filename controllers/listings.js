const express = require('express');
const router = express.Router();
const pool = require('../db')

router.get('/top', async (req, res) => {
  result = await pool.query("SELECT * FROM listings ORDER BY ID DESC LIMIT 9")
  res.json(result)
})

module.exports = router