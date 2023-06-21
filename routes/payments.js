const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const isAuth = require("../helpers/isAuth");

router.post("/create-checkout-session", isAuth, async (req, res) => {
  const cart = req.body.cart;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: cart.map((product) => {
        return {
          price_data: {
            unit_amount: product.discount
              ? (product.price -
                  (product.price / 100) * product.discountAmount) *
                100
              : product.price * 100,
            currency: "usd",
            product_data: {
              name: product.title,
              description: product.description,
            },
          },
          quantity: 1,
        };
      }),
      mode: "payment",
      success_url: process.env.FRONTEND_DOMAIN,
      cancel_url: process.env.FRONTEND_DOMAIN,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
