const product = require('../models/product.model');
const comment = require('../models/comment.model');
const { multipleMongooseToObject } = require('../../util/mongoose.js');
const jwt = require('jsonwebtoken');

class SiteController {

    async index(req, res){
        const PAGE_SIZE = 6;
        var products ;
        try {
            var page = req.query.page;
            if(page){
                page = parseInt(page);
                var intNext = (page - 1) * PAGE_SIZE
                products = await product.find({}).skip(intNext).limit(PAGE_SIZE)
            }else{
                products = await product.find({}).skip(0).limit(PAGE_SIZE)
            }
            res.render('home', {
                products: multipleMongooseToObject(products),
            });

        }catch(err){
            res.json({error: err});
        }
    }
    // [GET] /comment
    async comment(req, res, next) {
        await comment.find()
            .then((comments) => res.json({ comments }))
            .catch(next)
    }

    //[POST] /comment
    addComment(req, res, next) {
        const content = req.body.comment;
        const productId = req.body.productId;
        var token = req.cookies.token;
        var result = jwt.verify(token, 'mk');
        const userId = result._id;

        const newComment = new comment({
            content: content,
            userId: userId,
            productId: productId 
        });

        newComment.save()
        .then(() => res.redirect('back'))
        .catch((err) => {});
    }


}
module.exports = new SiteController();