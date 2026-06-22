const express = require('express');
const ProductController = require('../controller/ProductController');
const ProductImage = require('../utils/fileUpload');
const  validate  = require('../middleware/validate');
const productValidation = require('../utils/productValidate');
const router = express.Router();

router.get('/add', ProductController.addView);
router.post('/create', ProductImage.single('image'), validate(productValidation), ProductController.createProduct);

router.get('/list', ProductController.getAllProducts);
router.get('/', ProductController.getAllProducts);

router.get('/edit/:id', ProductController.editView);
router.post('/update/:id', ProductController.updateProduct);

//search
router.get('/search', ProductController.searchProducts);

//delete
router.put('/soft-delete/:id', ProductController.softDeleteProduct);
router.delete('/hard-delete/:id', ProductController.hardDeleteProduct);

//restore
router.put('/restore/:id', ProductController.restoreProduct);

//trash products
router.get('/trash', ProductController.trashProducts)




module.exports = router