const express = require("express")
const stripe = require("stripe")("sk_test_Your_test_key");
 
const PORT = 4000;

const app = express();
app.use(express.static("public"));
app.use(express.json());
 

app.post("/create-payment-intent", async (req, res) => {
  const { amount, currency } = req.body;

  const payableAmount = parseInt(amount) * 100;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: payableAmount,
    currency: currency // put your currency
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


app.listen(PORT ,() => {
    console.log(`Listening to the port number ${PORT}`)
})