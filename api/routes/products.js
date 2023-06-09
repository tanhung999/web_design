const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const checkAuth = require('../middleware/check-auth');
const ProductController=require('../controllers/products');

const storage = multer.diskStorage({
    
    destination: function(req, file, cb) {
        console.log(file);
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null,Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter

});



router.get('/',checkAuth,ProductController.products_get_all);

router.get('/:productId',checkAuth,ProductController.products_get_product)
router.post("/",checkAuth,upload.single('productImage'), ProductController.products_create_product)

router.put('/:productId',checkAuth,ProductController.products_update_product);
router.delete('/:productId',checkAuth,ProductController.products_delete);

module.exports = router;