const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subCategoryController');
const path = require("path");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedFileTypes = /jpeg|jpg|png|webp/;
        const extname = allowedFileTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        const mimetype = allowedFileTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(
                new Error(
                    "Invalid file type. Only JPEG, JPG, and PNG files are allowed."
                )
            );
        }
    },
});

// Create Subcategory under Category
router.post('/:categoryId', upload.single("image"), subcategoryController.createSubcategory);

// Get Subcategories
router.get('/', subcategoryController.getSubcategories);
router.get('/:id', subcategoryController.getSubcategoryById);
router.get('/category/:categoryId', subcategoryController.getSubcategoriesUnderCategory);

// Edit Subcategory
router.put('/:id', subcategoryController.updateSubcategory);

// // Create Item under Subcategory
// router.post('/:subcategoryId/items', subcategoryController.createItemUnderSubcategory);


module.exports = router;
