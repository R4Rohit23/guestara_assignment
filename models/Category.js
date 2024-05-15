const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
	name: { type: String, required: true },
	image: String,
	description: String,
	isTaxApplicable: Boolean,
	tax: Number,
	taxType: String,
	subCategories: [{ type: Schema.Types.ObjectId, ref: "SubCategory" }],
	items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
