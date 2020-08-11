const request = require('request-promise');

exports.PostDraftOrder=async (req,res,next)=>{

    let url = 'https://' + req.query.shop + '/admin/api/2020-07/draft_orders.json'
    
    let orders = {
        "draft_order": {
            "line_items": [
              {
                "variant_id": req.params.id,
                "quantity": req.body.quantity
              }
            ],
            "customer": {
                "id": req.body.id
              },
              "use_customer_default_address": true
        }
    };
   
    let options = {
        method: 'POST', uri: url,json: true,resolveWithFullResponse: true,headers: { 'X-Shopify-Access-Token': process.env.appStoreTokenTest,'content-type': 'application/json'},body:orders
    };

    try{
        const products=await request.post(options)
        res.json(products)
    }
    catch(e){
        res.status(404).json(e)
    }
}

//custom add drafts

exports.CustomPost=async (req,res,next)=>{

    let url = 'https://' + req.query.shop + '/admin/api/2020-07/draft_orders.json'
    
    let orders = {
        "draft_order": {
            "line_items": [
              {
                "title": req.body.title,
                "price": req.body.price,
                "quantity": req.body.quantity
              }
            ],
            "customer": {
              "id": req.body.id
            },
            "use_customer_default_address": true
          }
    };

    let options = {
        method: 'POST',uri: url, json: true, resolveWithFullResponse: true, headers: { 'X-Shopify-Access-Token': process.env.appStoreTokenTest, 'content-type': 'application/json' },body:orders
    };

    try{
        const products=await request.post(options)
        res.json(products)
    }
    catch(e){
        res.status(404).json(e)
    }
}


//get all drafts products
exports.getDrafts=async(req,res,next)=>{

    let url = 'https://' + req.query.shop + '/admin/api/2020-07/draft_orders.json'
    
    let options = { method: 'GET', uri: url, json: true, resolveWithFullResponse: true, headers: { 'X-Shopify-Access-Token': process.env.appStoreTokenTest, 'content-type': 'application/json' },
    };

    try{
        const products=await request(options)
        res.json(products)
    }
    catch(e){
        res.status(404).json(e)
    }
}


//get all drafts counts

exports.DraftsCounts=async (req,res,next)=>{

    let url = 'https://' + req.query.shop + '/admin/api/2020-07/draft_orders/count.json'
    
    let options = { method: 'GET', uri: url, json: true, resolveWithFullResponse: true, headers: { 'X-Shopify-Access-Token': process.env.appStoreTokenTest, 'content-type': 'application/json' },
    };

    try{
        const products=await request(options)
        res.json(products)
    }
    catch(e){
        res.status(404).json(e)
    }
}

//send in voice messages 
exports.SendInVoice=async (req,res,next)=>{

    let url = 'https://' + req.query.shop + '/admin/api/2020-07/draft_orders/'+req.params.id+'/send_invoice.json'
    
    let orders = {
            "draft_order_invoice": {}   
    };
   

    let options = { method: 'POST', uri: url, json: true, resolveWithFullResponse: true, headers: { 'X-Shopify-Access-Token': process.env.appStoreTokenTest, 'content-type': 'application/json' },
        body:orders
    };

    try{
        const products=await request.post(options)
        res.json(products)
    }
    catch(e){
        res.status(404).json(e)
    }
}

//delete Drafts
exports.DeleteDrafts=async (req,res,next)=>{

    let url = 'https://' + req.query.shop + '/admin/api/2020-07/draft_orders/'+req.params.id+'.json'

    let options = { method: 'DELETE', uri: url, resolveWithFullResponse: true,headers: {'X-Shopify-Access-Token': process.env.appStoreTokenTest,'content-type': 'application/json' }
    };

    try{
        const products=await request.delete(options)
        res.json(products)
    }
    catch(e){
        res.status(404).json(e)
    }
}


//making drafts mark as paid

exports.MarkAsPaid=async function (req, res, next) {

    
    let url = 'https://' + req.query.shop + '/admin/api/2020-07/draft_orders/'+req.params.id+'/complete.json'

    let options = { method: 'PUT', uri: url, json: true, resolveWithFullResponse: true, headers: { 'X-Shopify-Access-Token': process.env.appStoreTokenTest, 'content-type': 'application/json' },
    };

    try{
        const products=await request.put(options)
        res.json(products)
    }
    catch(e){
        res.status(404).json(e)
    }




}