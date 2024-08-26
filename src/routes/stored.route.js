const express = require('express');
const router = express.Router();
const storedController = require('../app/controllers/StoredController');


router.get('/product', storedController.showProduct);

router.get('/user', storedController.showUser);


module.exports = router;
