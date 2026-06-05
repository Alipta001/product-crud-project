const express = require('express');
const ProductController = require('../controller/ProductController');
const ProductImage = require('../utils/fileUpload')
const router = express.Router();

router.get('/add', ProductController.addView);
router.post('/create',ProductImage.single('image'), ProductController.createProduct);

router.get('/list', ProductController.getAllProducts);
router.get('/', ProductController.getAllProducts);

router.get('/edit/:id', ProductController.editView);
router.post('/update/:id', ProductController.updateProduct);

router.put('/delete/:id', ProductController.deleteProduct);

//trash products
router.get('/trash', ProductController.trashProducts)




module.exports = router