const product = require('../models/product.model.js');
const user = require('../models/user.model.js');
const comment = require('../models/comment.model.js');
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose.js');
const { response } = require('express');

class ProductController {
    //[GET] /products/:slug 
    async show(req, res) {
        try {
            const productData = await product.findOne({slug: req.params.slug});
            if (!productData){
                return res.status(404).json({ error: "Product not found" });
            } else {
                //res.json(productData);
                res.render('products/show', { product: mongooseToObject(productData) });
            }
        } catch(err) {
            res.status(500).json({ error: err.message });
        }
    }

    //[POST] /product/store
    store(req, res, next) {
        //res.json(req.body);
        
        const products = new product(req.body);
        products
            .save()
            .then(() => res.redirect('/'))
            .catch((err) => {
                console.error(err); 
                res.status(500).json({ error: "Failed to create product" });
            });
    }

    //[GET] /product/:id/edit
    async edit(req, res, next) {
        await product
            .findById(req.params.id)
            .then((product) =>
                res.render('products/edit', {
                    product: mongooseToObject(product),
                }),
            )
            .catch((next) =>
                res.json({
                    err: 'Error updating product',
                }),
            );
    }

    //[PUT] /product/:id
    async update(req, res, next) {
        await product.updateOne({ _id: req.params.id }, req.body);
        try {
            res.redirect('/stored/product');
        } catch (err) {
            res.json({ err: err.message });
        }
    }

    //[DELETE] /product/:id
    async delete(req, res, next) {
        await product.delete({ _id: req.params.id });
        try {
            res.redirect('back');
        } catch (err) {
            res.json({ err: err.message });
        }
    }

    //[PATCH] /product/:id/restore
    async restore(req, res, next) {
        await product.restore({ _id: req.params.id });
        try {
            res.redirect('back');
        } catch (err) {
            res.json({ err: err.message });
        }
    }

    //[DELETE] /product/:id
    async destroy(req, res, next) {
        await product.deleteOne({ _id: req.params.id });
        try {
            res.redirect('back');
        } catch (err) {
            res.json({ err: err.message });
        }
    }


    //[GET] /product/search
    search(req, res, next) {
        const kq = req.query.q; 
        product.find({
            name: { $regex: new RegExp(kq, 'i') } // Tìm kiếm không phân biệt hoa thường
        })
        .then(products =>
                //res.json(products)
                res.render('home', { products: multipleMongooseToObject(products) })
             )
        .catch(next);
    }

}
module.exports = new ProductController();