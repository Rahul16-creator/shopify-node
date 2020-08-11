const express=require('express')
const router=express.Router()

const DraftController=require('../../controller/draftorders')

router.post('/shopify/add-draftorders/:id',DraftController.PostDraftOrder)

//Create custom draft order

router.post('/shopify/add-draftorders',DraftController.CustomPost)

// GET all  draft  order details

router.get('/shopify/getAll-draftorders',DraftController.getDrafts)

//get orders count 

router.get('/shopify/count-orders',DraftController.DraftsCounts)

//send invoice msg

router.post('/shopify/invoice-orders/:id',DraftController.SendInVoice)

//delete order

router.post('/shopify/delete-draftorders/:id',DraftController.DeleteDrafts)

//mark as paid

router.post('/shopify/markas-paid/:id',DraftController.MarkAsPaid);

module.exports=router