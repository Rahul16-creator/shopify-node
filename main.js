const dotenv = require('dotenv').config();
const express = require('express');
const app = express();

const routerAuth=require('./router/user')
const routerProducts=require('./router/shop')
const routerInventory=require('./router/inventory')
const routerDraftOrder=require('./router/orders/draft_order')
const routerOrder=require('./router/orders/order')

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(routerTemp)



//ngrok http -host-header="localhost:44368" 44368
//https://{shop}.myshopify.com/admin/oauth/authorize?client_id={api_key}&scope={scopes}&redirect_uri={redirect_uri}&state={nonce}&grant_options[]={access_mode}

app.use(routerAuth)
app.use(routerProducts)
app.use(routerInventory)
app.use(routerOrder)
app.use(routerDraftOrder)


app.listen(44368, () => {
  console.log(' app listening on port 3000!');
});
