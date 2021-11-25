const express = require('express');
const router = express.Router();
const pool = require('../db')

router.get('/listing/:id', async (req, res) => {
  const result = await pool.query("SELECT offers.id, offers.closed, offers.buyer_id, offers.seller_id, sellerListings.creator_id AS buyerListings_creator_id, sellerListings.id AS sellerListings_id, sellerListings.title AS sellerListings_title, sellerListings.description AS sellerListings_description, sellerListings.category AS sellerListings_category, sellerListings.sale_option AS sellerListings_sale_option, sellerListings.looking_for AS sellerListings_looking_for, sellerListings.img AS sellerListings_img, sellerListings.price AS sellerListings_price, sellerListings.creator_id AS sellerListings_creator_id, buyerListings.id AS buyerListings_id, buyerListings.title AS buyerListings_title, buyerListings.description AS buyerListings_description, buyerListings.category AS buyerListings_category, buyerListings.sale_option AS buyerListings_sale_option, buyerListings.looking_for AS buyerListings_looking_for, buyerListings.img AS buyerListings_img, buyerListings.price AS buyerListings_price, buyer.username as buyer_username, buyer.email as buyer_email, seller.username as seller_username, seller.email as seller_email FROM offers JOIN listings sellerListings ON offers.seller_listing = sellerListings.id JOIN listings buyerListings ON offers.buyer_listing = buyerListings.id JOIN users seller ON seller.id = sellerListings.creator_id JOIN users buyer ON buyer.id = buyerListings.creator_id WHERE offers.seller_listing = $1 OR offers.buyer_listing = $1 ORDER BY offers.id DESC", [req.params.id])
  res.json(result)
})

router.get('/seller/:id', async (req, res) => {
  const result = await pool.query("SELECT offers.id, offers.closed, sellerListings.creator_id AS buyerListings_creator_id, sellerListings.id AS sellerListings_id, sellerListings.title AS sellerListings_title, sellerListings.description AS sellerListings_description, sellerListings.category AS sellerListings_category, sellerListings.sale_option AS sellerListings_sale_option, sellerListings.looking_for AS sellerListings_looking_for, sellerListings.img AS sellerListings_img, sellerListings.price AS sellerListings_price, sellerListings.creator_id AS sellerListings_creator_id, buyerListings.id AS buyerListings_id, buyerListings.title AS buyerListings_title, buyerListings.description AS buyerListings_description, buyerListings.category AS buyerListings_category, buyerListings.sale_option AS buyerListings_sale_option, buyerListings.looking_for AS buyerListings_looking_for, buyerListings.img AS buyerListings_img, buyerListings.price AS buyerListings_price, buyer.username as buyer_username, buyer.email as buyer_email, seller.username as seller_username, seller.email as seller_email FROM offers JOIN listings sellerListings ON offers.seller_listing = sellerListings.id JOIN listings buyerListings ON offers.buyer_listing = buyerListings.id JOIN users seller ON seller.id = sellerListings.creator_id JOIN users buyer ON buyer.id = buyerListings.creator_id WHERE offers.seller_id = $1 ORDER BY offers.id DESC", [req.params.id])
  res.json(result)
})

router.get('/buyer/:id', async (req, res) => {
  const result = await pool.query("SELECT offers.id, offers.closed, sellerListings.creator_id AS buyerListings_creator_id, sellerListings.id AS sellerListings_id, sellerListings.title AS sellerListings_title, sellerListings.description AS sellerListings_description, sellerListings.category AS sellerListings_category, sellerListings.sale_option AS sellerListings_sale_option, sellerListings.looking_for AS sellerListings_looking_for, sellerListings.img AS sellerListings_img, sellerListings.price AS sellerListings_price, sellerListings.creator_id AS sellerListings_creator_id, buyerListings.id AS buyerListings_id, buyerListings.title AS buyerListings_title, buyerListings.description AS buyerListings_description, buyerListings.category AS buyerListings_category, buyerListings.sale_option AS buyerListings_sale_option, buyerListings.looking_for AS buyerListings_looking_for, buyerListings.img AS buyerListings_img, buyerListings.price AS buyerListings_price, buyer.username as buyer_username, buyer.email as buyer_email, seller.username as seller_username, seller.email as seller_email FROM offers JOIN listings sellerListings ON offers.seller_listing = sellerListings.id JOIN listings buyerListings ON offers.buyer_listing = buyerListings.id JOIN users seller ON seller.id = sellerListings.creator_id JOIN users buyer ON buyer.id = buyerListings.creator_id WHERE offers.buyer_id = $1 ORDER BY offers.id DESC", [req.params.id])
  res.json(result)
})

router.get('/user/:id', async (req, res) => {
  const result = await pool.query("SELECT offers.id, offers.closed, sellerListings.creator_id AS buyerListings_creator_id, sellerListings.id AS sellerListings_id, sellerListings.title AS sellerListings_title, sellerListings.description AS sellerListings_description, sellerListings.category AS sellerListings_category, sellerListings.sale_option AS sellerListings_sale_option, sellerListings.looking_for AS sellerListings_looking_for, sellerListings.img AS sellerListings_img, sellerListings.price AS sellerListings_price, sellerListings.creator_id AS sellerListings_creator_id, buyerListings.id AS buyerListings_id, buyerListings.title AS buyerListings_title, buyerListings.description AS buyerListings_description, buyerListings.category AS buyerListings_category, buyerListings.sale_option AS buyerListings_sale_option, buyerListings.looking_for AS buyerListings_looking_for, buyerListings.img AS buyerListings_img, buyerListings.price AS buyerListings_price, buyer.username as buyer_username, buyer.email as buyer_email, seller.username as seller_username, seller.email as seller_email FROM offers JOIN listings sellerListings ON offers.seller_listing = sellerListings.id JOIN listings buyerListings ON offers.buyer_listing = buyerListings.id JOIN users seller ON seller.id = sellerListings.creator_id JOIN users buyer ON buyer.id = buyerListings.creator_id WHERE offers.buyer_id = $1 OR offers.seller_id = $1 ORDER BY offers.id DESC", [req.params.id])
  res.json(result)
})

router.put('/:id', async (req, res) => {
  if(req.body.request === 'accept') {
    const accept = await pool.query("UPDATE offers SET closed = 'declined' WHERE seller_listing = $1", [req.body.seller_listing])
  }
  const result = await pool.query("UPDATE offers SET closed = $1 WHERE id = $2", [req.body.closed, req.params.id])
  res.json(result)
})

router.post('/', async (req, res) => {
  try{
    const result = await pool.query("INSERT INTO offers (buyer_id, seller_id, buyer_listing, seller_listing, created_date) VALUES ($1, $2, $3, $4, current_timestamp)", [req.body.buyerId, req.body.sellerId, req.body.buyerListing, req.body.sellerListing])
    res.json(result)
  } catch(error) {
    console.log(error)
  }
})

module.exports = router