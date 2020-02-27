var productController = require('../controllers/product')


module.exports = (router)=>{

router.post('/products', function (req, res) {
productController.create_product(req,res);
})

router.put('/products/:id', function (req, res) {
  productController.update_product(req,res);
})
  
router.delete('/products/:id', function (req, res) {
  productController.delete_product(req,res);
})
  
  
router.get('/products/:id', function (req, res) {
    productController.show_one_product(req,res);
})


router.get('/all/products', function (req, res) {
  productController.show_product(req,res);
})
  
}