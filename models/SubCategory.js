const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
	name: { type: String, required: true },
	image: String,
	description: String,
	isTaxApplicable: {
    type: Boolean,
    default: function () {
      return this.category && this.category.isTaxApplicable;
    },
  },
  tax: {
    type: Number,
    default: function () {
      return this.category && this.category.tax;
    },
  },
	category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
	items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
});

// Set the default values from the category if not provided at the time of creation
subcategorySchema.pre("save", function (next) {
	this.isTaxApplicable =
		this.isTaxApplicable === undefined
			? this.category.isTaxApplicable
			: this.isTaxApplicable;
	this.tax = this.tax === undefined ? this.category.tax : this.tax;
	next();
});

const SubCategory = mongoose.model("SubCategory", subcategorySchema);
module.exports = SubCategory;
