const Item = require("../models/Item");
const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");
const s3Utils = require("../utils/s3");

exports.createItem = async (req, res) => {
	try {
		const { name, description, isTaxApplicable, tax, baseAmount, discount } =
			req.body;

		const subCategory = await SubCategory.findById(req.params.subCategoryId);

		if (!subCategory) {
			return res
				.status(404)
				.json({ success: false, error: "SubCategory not found" });
		}

		const file = req.file;
		var imageUrl;

		if (file) {
			const fileName = `${name + "." + file?.originalname.split(".").pop()}`;

			imageUrl = await s3Utils.uploadFileToS3(
				file,
				fileName,
				process.env.AWS_BUCKET_NAME
			);
		}

		const total = baseAmount - discount;

		const newItem = new Item({
			name,
			image: imageUrl,
			description,
			isTaxApplicable,
			tax,
			baseAmount,
			discount,
			total,
			subCategory: subCategory._id,
		});

		const savedItem = await newItem.save();

		// push the newly created item id into sub category
		subCategory.items.push(savedItem._id);
		await subCategory.save();

		res.status(201).json({ success: true, data: savedItem });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

exports.createItemUnderCategory = async (req, res) => {
	try {
		const category = await Category.findById(req.params.categoryId);
		if (!category) {
			return res.status(404).json({ error: "Category not found" });
		}

		const file = req.file;
		var imageUrl;

		if (file) {
			const fileName = `${
				file.originalname + "." + file.originalname.split(".").pop()
			}`;

			imageUrl = await s3Utils.uploadFileToS3(
				file,
				fileName,
				process.env.AWS_BUCKET_NAME
			);
		}

		const item = new Item({
			...req.body,
			category: category._id,
			image: imageUrl,
		});

		const savedItem = await item.save();
		category.items.push(savedItem._id);
		await category.save();

		res.status(201).json(savedItem);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

exports.getItems = async (req, res) => {
	try {
		const items = await Item.find();
		res.json(items);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.getItemsUnderSubcategory = async (req, res) => {
	try {
		const subcategory = await SubCategory.findById(
			req.params.subcategoryId
		).populate("items");
		if (!subcategory) {
			return res.status(404).json({ error: "Subcategory not found" });
		}
		res.json(subcategory.items);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.getItemsUnderCategory = async (req, res) => {
	try {
		const category = await Category.findById(
			req.params.categoryId
		).populate("items");
    
		if (!category) {
			return res.status(404).json({ error: "Category not found" });
		}
		res.json(category.items);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.getItemById = async (req, res) => {
	try {
		const item = await Item.findById(req.params.id);
		if (!item) {
			return res.status(404).json({ error: "Item not found" });
		}
		res.json(item);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.updateItem = async (req, res) => {
	try {
		const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!updatedItem) {
			return res.status(404).json({ error: "Item not found" });
		}
		res.json(updatedItem);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

exports.searchItemByName = async (req, res) => {
	try {
		const { name } = req.query;
		console.log(name);
		const items = await Item.find({ name: { $regex: name, $options: "i" } });
		res.json(items);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
