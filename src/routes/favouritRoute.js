const express = require('express');
const router = express.Router();
const { addToFavourit, getFavourit, removeFromFavourit } = require('../controllers/favouritController');
const protectRouter = require('../middleware/protectRouting');

router.post('/add', protectRouter, addToFavourit);
router.get('/:userId', protectRouter, getFavourit);
router.delete('/remove/:userId/:productId', protectRouter, removeFromFavourit);

module.exports = router;