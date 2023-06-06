const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
  _id: ObjectId,
  name: {type:String, required: true},
  description: {type:String, required: true},
  price: {type:Number, required: true},
  quantity: {type:Number, default:1},
  productImage: { type: String, required: true },
});
module.exports = mongoose.model('Product',productSchema);