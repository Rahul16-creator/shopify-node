const express=require('express')
const router=express.Router()
const ShopController=require('../controller/shop')
const Upload=require('../fileupload/fileupload').upload

router.get('/shopify/products', ShopController.getProducts);

router.get('/shopify/product/:id',ShopController.getProductById);

router.post('/shopify/create-product',ShopController.AddProducts);

router.post('/shopify/edit/:id',ShopController.EditProducts)

router.post('/shopify/delete/:id',ShopController.DeleteProduct);

router.post('/image-upload/:id',Upload.single('image'),ShopController.ImageUploads)

router.put('/image-edit/:id',ShopController.EditImage)

router.delete('/image-delete/:id',ShopController.DeleteImage)


module.exports=router









/*


"option2": "Black",
      "price2": "600",
      "inventory_management2":"shopify",
      "weight2":3.4,
      "weight_unit2":"kg",
      "inventory_quantity2":10




      


*/