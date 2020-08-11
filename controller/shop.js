const name=require('../fileupload/fileupload').name
const request = require('request-promise');

//Getting all the products
exports.getProducts=async (req, res, next)=>{
    let url = 'https://' + req.query.shop + '/admin/products.json';
    let options = {
        method: 'GET',
        uri: url,
        json: true,
        headers: {'X-Shopify-Access-Token': process.env.appStoreTokenTest,'content-type': 'application/json'}
    };
    try{
        const products=await request(options)
        res.json(products)
    }
    catch(e){
        res.status(404).json(e)
    }
}


//Getting a product by Id

exports.getProductById=async (req, res, next)=>{

    let url = 'https://' + req.query.shop + '/admin/products/'+req.params.id+".json";
    let options = {
        method: 'GET',
        uri: url,
        json: true,
        headers: {'X-Shopify-Access-Token': process.env.appStoreTokenTest,'content-type': 'application/json'}
    };

    try{
        const products=await request(options)
        res.json(products)
    }
    catch(e){
        res.status(404).json(e)
    }
}



//Adding a Products

exports.AddProducts=async (req, res)=>{
    let new_product = {
       
        "product": {
          "title": req.body.title,
          "body_html": req.body.body_html,
          "product_type": req.body.product_type,
          "Trackquantity":req.body.Trackquantity,
          "variants": [
              {
                "option1": req.body.option1,
                "price": req.body.price1,
                "inventory_management":"shopify",
                "weight":req.body.weight1,
                "weight_unit":req.body.weight_unit1,
                "inventory_quantity":req.body.inventory_quantity1,
              },
              {
                "option1": req.body.option2,
                "price": req.body.price2,
                "weight":req.body.weight1,
                "inventory_management":"shopify",
                "weight_unit":req.body.weight_unit1,
                "inventory_quantity":req.body.inventory_quantity2,
              }
            ]
        }
      
  };
    let url = 'https://' + req.query.shop + '/admin/products.json';

    let options = {
        method: 'POST',
        uri: url,
        json: true,
        resolveWithFullResponse: true,
        headers: {'X-Shopify-Access-Token': process.env.appStoreTokenTest,'content-type': 'application/json'},
        body: new_product
    };
     
    try{
        const products=await request.post(options)
        res.json(products)
    }
    catch(e){
        res.status(404).json(e)
    }

}

// Edit a products

exports.EditProducts= async(req, res, next)=>{

    let url = 'https://' + req.query.shop + '/admin/api/2020-07/products/'+req.params.id+'.json';

    let update_product = {
        "product": {
            "id": req.params.id,
            "variants": [
              {
                "id": req.body.variants1,
                "price": req.body.price
              },
              {
                "id": req.body.variants2
              },
            ]
          }
    };

    let options = { method: 'PUT', uri: url, json: true, resolveWithFullResponse: true, headers: { 'X-Shopify-Access-Token': process.env.appStoreTokenTest, 'content-type': 'application/json' }, body: update_product
    };

    try{
        const products=await request.put(options)
        res.json(products)
    }
    catch(e){
        res.status(404).json(e)
    }

}

//delete a product

exports.DeleteProduct=async (req, res)=>{

    let url = 'https://' + req.query.shop + '/admin/products/' + req.params.id + '.json';

    let options = {method: 'DELETE',uri: url, resolveWithFullResponse: true,headers: { 'X-Shopify-Access-Token': process.env.appStoreTokenTest, 'content-type': 'application/json' }
    };

    try{
        const products=await request.delete(options)
        res.json(products)
    }
    catch(e){
        res.status(404).json(e)
    }
   
}


//image uploads
exports.ImageUploads=async (req,res,next)=>{

const new_product={
    "image": {
        attachment:new Buffer(req.file.buffer, 'binary').toString('base64'),
        "filename": req.file.filename
    }
}

let url = 'https://' + req.query.shop + '/admin/api/2020-07/products/'+req.params.id+'/images.json'

let options = { method: 'POST', uri: url, json: true, resolveWithFullResponse: true, headers: {'X-Shopify-Access-Token': process.env.appStoreTokenTest,'content-type': 'application/json'}, body: new_product
};
 
try{
    const products=await request.post(options)
    res.json(products)
}
catch(e){
    res.status(404).json(e)
}}





//Delete an image

exports.DeleteImage=async (req,res,next)=>{

    let url = 'https://' + req.query.shop + '/admin/api/2020-07/products/'+req.params.id+'/images/'+req.body.id +'.json'
    
    let options = { method: 'Delete', uri: url, json: true, resolveWithFullResponse: true, headers: {'X-Shopify-Access-Token': process.env.appStoreTokenTest,'content-type': 'application/json'},
    };
     
    try{
        const products=await request.delete(options)
        res.json(products)
    }
    catch(e){
        res.status(404).json(e)
   } }




//Editing the image position

exports.EditImage=async (req,res,next)=>{


    const new_product={
        "image": {
            "id": req.body.id,
            "position": req.body.position,
            "alt": req.body.alt
          }
    }

    let url = 'https://' + req.query.shop + '/admin/api/2020-07/products/'+req.params.id+'/images/'+req.body.id +'.json'
    
    let options = {method: 'PUT',uri: url,json: true,resolveWithFullResponse: true,headers: {'X-Shopify-Access-Token': process.env.appStoreTokenTest,'content-type': 'application/json'},body: new_product
    };
     
    try{
        const products=await request.put(options)
        res.json(products)
    }
    catch(e){
        res.status(404).json(e)
    } 
    }
