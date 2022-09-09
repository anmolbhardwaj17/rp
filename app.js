const dotenv = require('dotenv');
const express = require('express');
var cors = require('cors')
const app = express();
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51LelHLSDg3jfkNpBe9sHVmIFTfFbQNsEe3fosOoSKU07UXM8Rm1PFCAWkhh0rX5BRFYMkr5oj9sQ6jhIptdIOb7v00LSatjIk8');

dotenv.config({path: './config.env'});

require('./db/connection');
app.use(express.json());
const PORT = process.env.PORT;
app.use(cors())

app.get("/", async (req, res) =>{
    const products = await stripe.products.list({
        limit: 4,
      });
      console.log(products)
    res.send({message:"rp assignment", code:200, products:products});
});

app.get("/prices", async (req, res) =>{
    
// const price = await stripe.prices.retrieve(
//     'price_1LelopSDg3jfkNpB5c5Lkd2g'
//   );
const price = await stripe.prices.list({
    limit: 8,
  });
      console.log(price)
    res.send({message:"rp assignment", code:200, price:price});
});

app.get("/session", async (req, res) =>{
    
    const session = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:5000/order/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:5000/cancel',
        line_items: [
          {price: 'price_1LelopSDg3jfkNpBw6p7ksmD', quantity: 1},
        ],
        mode: 'subscription',
      });

      //store session id in db for particular user
        res.send({message:"rp assignment", code:200, price:session});
    });
    
    app.get("/sessiondetailsget", async (req, res) =>{
    
        const session = await stripe.checkout.sessions.retrieve(
            'cs_test_a1ZECWkQ33jTQPNw3iqGP9jYr3x0KvZSYJ7eRm689Y6w0kVDVJLY2bdwgp'
          );
    
          //store session id in db for particular user
            res.send({message:"rp assignment", code:200, price:session});
        });

       

          app.get("/deletesubscription", async (req, res) =>{
    
            const deleted = await stripe.subscriptions.del(
                'sub_1Lg3eh2eZvKYlo2CXheTwxii'
              );
        
              //store session id in db for particular user
                res.send({message:"rp assignment", code:200, price:deleted});
            });

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`) 
})