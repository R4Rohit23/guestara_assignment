const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  image: String,
  description: String,
  isTaxApplicable: Boolean,
  tax: Number,
  baseAmount: { type: Number, required: true },
  discount: Number,
  totalAmount: Number,
  subCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;