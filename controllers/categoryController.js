const Category = require("../models/Category");
const Item = require("../models/Item");
const s3Utils = require("../utils/s3");

// Controller to create category
exports.createCategory = async (req, res) => {
	try {
		const { name, description, isTaxApplicable, tax, taxType, subCategories } =
			req.body;

		const file = req.file;
		var imageUrl;

		if (file) {
			const fileName = `${name + "." + file.originalname.split(".").pop()}`;

			imageUrl = await s3Utils.uploadFileToS3(
				file,
				fileName,
				process.env.AWS_BUCKET_NAME
			);
		}

		const category = new Category({
			name,
			description,
			image: imageUrl,
			isTaxApplicable,
			tax,
			taxType,
			subCategories,
		});

		const savedCategory = await category.save();

		res.status(201).json({ success: true, data: savedCategory });
	} catch (err) {
		res.status(400).json({ success: false, error: err.message });
	}
};

// Controller to fetch all categories
exports.getCategories = async (req, res) => {
	try {
		const categories = await Category.find();
		res.json(categories);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Controller to fetch category by its id
exports.getCategoryById = async (req, res) => {
	try {
		const category = await Category.findById(req.params.id);
		if (!category) {
			return res.status(404).json({ error: "Category not found" });
		}
		res.json(category);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.updateCategory = async (req, res) => {
	try {
		const updatedCategory = await Category.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		if (!updatedCategory) {
			return res.status(404).json({ error: "Category not found" });
		}
		res.json(updatedCategory);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

exports.getItemsUnderCategory = async (req, res) => {
	try {
		const category = await Category.findById(req.params.categoryId).populate(
			"items"
		);
		if (!category) {
			return res.status(404).json({ error: "Category not found" });
		}
		res.json(category.items);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
