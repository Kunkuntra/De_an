const express = require('express');
const productController = require('../app/controllers/productController');
const router = express.Router();

router.get('/:id/edit', productController.edit);

router.put('/:id', productController.update);

router.delete('/:id', productController.delete);

router.get('/search', productController.search); // Route cho chức năng tìm kiếm

router.patch('/:id/restore', productController.restore);

router.delete('/:id/destroy', productController.destroy);

router.get('/create', (req,res) => res.render('products/create') )

router.post('/store', productController.store)

router.get('/:slug', productController.show);  


module.exports = router;