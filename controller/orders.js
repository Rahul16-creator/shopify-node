const request = require('request-promise');

exports.getAllOrders=async (req,res,next)=>{

    let url = 'https://' + req.query.shop + '/admin/api/2020-07/orders.json?status=any'
    
    let options = { method: 'GET', uri: url, json: true, resolveWithFullResponse: true, headers: {  'X-Shopify-Access-Token': process.env.appStoreTokenTest, 'content-type': 'application/json'  },
    };

    try{
        const products=await request(options)
        res.json(products)
    }
    catch(e){
        res.status(404).json(e)
    }
}

exports.CreateAnOrderAndFulFil=async (req,res,next)=>{

    let url = 'https://' + req.query.shop + '/admin/api/2020-07/orders.json'
    
    let orders = {
        "order": {
                "email": req.body.email,
                "line_items": [
                  {
                    "variant_id": req.params.id,
                    "quantity": req.body.quantity
                  }
                ]
              }
    };
   

    let options = { method: 'POST', uri: url, json: true, resolveWithFullResponse: true, headers: {     'X-Shopify-Access-Token': process.env.appStoreTokenTest,   'content-type': 'application/json'  }, body:orders
    };

    try{
        const products=await request.post(options)
        res.json(products)
    }
    catch(e){
        res.status(404).json(e)
    }
}

exports.DeleteAnOrder=async(req,res,next)=>{

    let url = 'https://' + req.query.shop + '/admin/api/2020-07/orders/'+req.params.id+'.json'

    let options = { method: 'DELETE', uri: url, resolveWithFullResponse: true, headers: { 'X-Shopify-Access-Token': process.env.appStoreTokenTest, 'content-type': 'application/json' }
    };

    try{
        const products=await request.delete(options)
        res.json(products)
    }
    catch(e){
        res.status(404).json(e)
    }
}