const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
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

// Create Category
router.post('/', upload.single("image"), categoryController.createCategory);

// Get Categories
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);

// Edit Category
router.put('/:id', categoryController.updateCategory);

module.exports = router;