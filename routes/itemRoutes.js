const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
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

// Create Item Under subcategory
router.post('/subcategory/:subCategoryId', upload.single("image"), itemController.createItem);

// Create Item under Category
router.post('/category/:categoryId', upload.single("image"), itemController.createItemUnderCategory);

// Get Items
router.get('/', itemController.getItems);
router.get('/getItemById/:id', itemController.getItemById);

// Get Items under Category
router.get('/category/:categoryId', itemController.getItemsUnderCategory);

// Get Items under SubCategory
router.get('/subcategory/:subcategoryId', itemController.getItemsUnderSubcategory);


// Edit Item
router.put('/:id', itemController.updateItem);

// Search Item
router.get('/search', itemController.searchItemByName);

module.exports = router;