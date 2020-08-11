const express=require('express')
const router=express.Router()
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');




const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'read_products,write_products,read_inventory,write_inventory,read_orders,write_orders,read_draft_orders,write_draft_orders';
const forwardingAddress = "https://ee62d6baa17c.ngrok.io"
// const scopes="read_customers,write_customers,read_products,write_products,read_inventory,write_inventory,read_orders,write_orders,admin_login_tokens, admin_notifications, admin_shop_settings, all_orders, all_subscription_contracts, analytics, analytics_overviews, apps, assigned_fulfillment_orders, banking, billing, capital, cash_tracking, channels, checkout_settings, checkouts, checkouts_vault_tokens, content, customer_payment_methods, customer_tags, customers, delivery, discounts, disputes, domains, draft_orders, fulfillments, gdpr_data_request, gift_card_adjustments, gift_cards, home, images, inventory, kit_skills, legal_policies, locales, locations, marketing_events, media_processing, merchant_managed_fulfillment_orders, meta_tags, mobile_payments, mobile_platform_applications, notifications, online_store, online_store_bot_protection, online_store_navigation, online_store_pages, online_store_preferences, order_edits, orders, own_subscription_contracts, payment_gateways, payment_sessions, payment_settings, physical_receipts, point_of_sale_devices, price_rules, product_engagements, product_inventory, product_listings, product_tags, products, publications, reports, resource_feedbacks, retail_addon_subscriptions, retail_bbpos_merchant, retail_roles, sales_agreements, script_tags, scripts, shipping, shopify_payments, shopify_payments_accounts, shopify_payments_balance_debits, shopify_payments_bank_accounts, shopify_payments_bank_accounts_sensitive, shopify_payments_disputes, shopify_payments_legal_entities, shopify_payments_payouts, shopify_payments_payouts_status, smart_grid, social_network_accounts, subscription_plans, taxes, themes, third_party_fulfillment_orders, tracking_pixels, translations, user_private_data"




router.get('/shopify', (req, res) => {
    const shop = req.query.shop;
    if (shop) {
      const state = nonce();
      const redirectUri = forwardingAddress + '/shopify/callback';
      const installUrl = 'https://' + shop +
        '/admin/oauth/authorize?client_id=' + apiKey +
        '&scope=' + scopes +
        '&state=' + state +
        '&redirect_uri=' + redirectUri;
  
      res.cookie('state', state);
      console.log(installUrl)
      res.redirect(installUrl);
    } else {
      return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
    }
  });


  router.get('/shopify/callback', (req, res) => {
    const { shop, hmac, code, state } = req.query;
    const stateCookie = cookie.parse(req.headers.cookie).state;
  
    if (state !== stateCookie) {
      return res.status(403).send('Request origin cannot be verified');
    }
    if (shop && hmac && code) {

        const map = Object.assign({}, req.query);
      delete map['signature'];
      delete map['hmac'];
      const message = querystring.stringify(map);
      const providedHmac = Buffer.from(hmac, 'utf-8');
      const generatedHash = Buffer.from(
        crypto
          .createHmac('sha256', apiSecret)
          .update(message)
          .digest('hex'),
          'utf-8'
        );
      let hashEquals = false;
  
      try {
        hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac)
      } catch (e) {
        hashEquals = false;
      };
  
      if (!hashEquals) {
        return res.status(400).send('HMAC validation failed');
      }
  
      const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
      const accessTokenPayload = {
        client_id: apiKey,
        client_secret: apiSecret,
        code,
      };
      
      request.post(accessTokenRequestUrl, { json: accessTokenPayload })
      .then((accessTokenResponse) => {

      // process.env.accessTokenPayload=accessTokenResponse.access_token
        console.log(accessTokenResponse.access_token)


        const accessToken = accessTokenResponse.access_token;
        console.log(accessToken)
        
        const shopRequestUrl = 'https://' + shop + '/admin/api/2020-07/shop.json';
        const shopRequestHeaders = {
          'X-Shopify-Access-Token': accessToken,
        };
  


        
        request.get(shopRequestUrl, { headers: shopRequestHeaders })
        .then((shopResponse) => {
          res.status(200).end(shopResponse);
        })
        .catch((error) => {
          res.status(error.statusCode).send(error.error.error_description);
        });
      })
      .catch((error) => {
        res.status(error.statusCode).send(error.error.error_description);
      });
  
    } else {
      res.status(400).send('Required parameters missing');
    }
  });




  






module.exports=router