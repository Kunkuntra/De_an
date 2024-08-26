const product = require('../models/product.model');
const user = require('../models/user.model');
const { multipleMongooseToObject } = require('../../util/mongoose.js');

class StoredController {
    

    // async showProduct(req, res) {
    //     try {
    //         var countProductDelete = await product.findWithDeleted({ deleted: true});
    //         const products = await product.find({});
    //         res.render('stored/storedProduct', {
    //             products: multipleMongooseToObject(products),
    //             countProductDelete : countProductDelete
    //         });
    //     } catch (error) {
    //         res.status(400).json({ error: 'ERROR!!!' });
    //     }
    // }

    //[GET] /stored/product
    showProduct(req, res, next) {
        Promise.all([product.find({}), product.countDocumentsWithDeleted({ deleted: true })])
            .then(([products, countProductDelete])=>{
                res.render('stored/storedProduct', {
                    products: multipleMongooseToObject(products),
                    countProductDelete,
                });
            })
            .catch(next);
    }

    // [GET] /stored/user
    showUser(req, res, next) {
        Promise.all([user.find({}), user.countDocumentsWithDeleted({ deleted: true })])
            .then(([users, countUserDelete])=>{
                res.render('stored/storedUser', {
                    users: multipleMongooseToObject(users),
                    countUserDelete,
                });
            })
            .catch(next);
    }

}

module.exports = new StoredController();
