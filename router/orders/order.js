const express=require('express')
const router=express.Router()
const OrderController=require('../../controller/orders')

//get all orders

router.get('/shopify/getAll-orders',OrderController.getAllOrders)

//create an order and fulfil it

router.post('/shopify/add-orders/:id',OrderController.CreateAnOrderAndFulFil)

//delete an order

router.post('/shopify/delete-orders/:id',OrderController.DeleteAnOrder)

module.exports=router