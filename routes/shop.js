const router = require("express").Router(),
  path = require("path");

const shopController = require("../controller/shop");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:id", shopController.getProduct);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.post("/cart-delete-item", shopController.deleteCartProduct);

router.get("/orders", shopController.getOrders);

router.post("/create-order", shopController.postOrders);

// router.get("/checkout", shopController.getCheckout);

module.exports = router;
