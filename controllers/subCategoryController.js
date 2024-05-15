const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const Item = require("../models/Item");
const s3Utils = require("../utils/s3");

exports.createSubcategory = async (req, res) => {
	try {
		const { name, description, isTaxApplicable, tax } = req.body;

		const category = await Category.findById(req.params.categoryId);

		if (!category) {
			return res
				.status(404)
				.json({ success: false, error: "Category not found" });
		}

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

		const subcategory = new SubCategory({
			name,
			description,
			isTaxApplicable,
			tax,
			image: imageUrl,
			category: category._id,
		});

		const savedSubcategory = await subcategory.save();

		// push the newly created subcategory id into parent category
		category.subCategories.push(savedSubcategory._id);
		await category.save();
		res.status(201).json({ success: true, data: savedSubcategory });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

exports.getSubcategories = async (req, res) => {
	try {
		const subcategories = await SubCategory.find();
		res.json(subcategories);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.getSubcategoryById = async (req, res) => {
	try {
		const subcategory = await SubCategory.findById(req.params.id);
		if (!subcategory) {
			return res.status(404).json({ error: "Subcategory not found" });
		}
		res.json(subcategory);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.getSubcategoriesUnderCategory = async (req, res) => {
	try {
		const category = await Category.findById(req.params.categoryId).populate(
			"subCategories"
		);
		if (!category) {
			return res.status(404).json({ error: "Category not found" });
		}
		res.json(category.subCategories);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.updateSubcategory = async (req, res) => {
	try {
		const updatedSubcategory = await SubCategory.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		if (!updatedSubcategory) {
			return res.status(404).json({ error: "Subcategory not found" });
		}
		res.json(updatedSubcategory);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

exports.createItemUnderSubcategory = async (req, res) => {
	try {
		const subcategory = await SubCategory.findById(req.params.subcategoryId);
		if (!subcategory) {
			return res.status(404).json({ error: "Subcategory not found" });
		}

		const item = new Item({ ...req.body, subCategory: subcategory._id });
		const savedItem = await item.save();
		subcategory.items.push(savedItem._id);
		await subcategory.save();

		res.status(201).json(savedItem);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
