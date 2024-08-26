const mongoose = require('mongoose')
const Schema = mongoose.Schema
var slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

mongoose.plugin(slug);

const product = new Schema({
    name: { type: String, required: true},
    des: { type: String },
    img: { type: String },
    brand: {type: String },
    cPrice: {type: Number, required: true},
    oPrice: {type: Number },
    remaining : {type: Number, default: 0},
    origin: {type: String},
    slug: { type: String, slug: 'name', unique: true}
},{timestamps: true});

product.plugin(mongooseDelete, 
    { 
        deletedAt : true,
        overrideMethods: true,
    });

module.exports = mongoose.model('product', product);