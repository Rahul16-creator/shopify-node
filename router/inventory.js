const express=require('express')
const router=express.Router()
const request = require('request-promise');




router.get('/shopify/inventory/:id',(req,res,next)=>{

    let url = 'https://' + req.query.shop + '/admin/api/2020-07/inventory_items.json?ids'+ req.params.id
    

    let options = {
        method: 'GET',
        uri: url,
        json: true,
        resolveWithFullResponse: true,
        headers: {
            'X-Shopify-Access-Token': process.env.appStoreTokenTest,
            'content-type': 'application/json'
        }
    };

    request(options)
    .then(function (parsedBody) {
        
        res.json(parsedBody);
    })
    .catch(function (err) {
        console.log(err);
        res.status(404).json(err);
    });


})






router.put('/shopify/inventory/:id',(req,res,next)=>{

    let url = 'https://' + req.query.shop + '/admin/api/2020-07/inventory_items/'+ req.params.id+'.json'
    
    let update_product = {
            "inventory_item": {
                "id": req.params.id,
                "sku":123,
                "Available":20
              }
        
    };
   
    console.log(update_product)

    let options = {
        method: 'PUT',
        uri: url,
        json: true,
        resolveWithFullResponse: true,
        headers: {
            'X-Shopify-Access-Token': process.env.appStoreTokenTest,
            'content-type': 'application/json'
        },
        body:update_product
    };

    request(options)
    .then(function (parsedBody) {
        console.log(parsedBody);
        res.json(parsedBody);
    })
    .catch(function (err) {
        console.log(err);
        res.status(404).json(err);
    });


})




module.exports=router