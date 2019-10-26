const router = require("express").Router();
const isAuth = require("../middleware/is-auth");
const shopController = require("../controller/shop");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:id", shopController.getProduct);

router.get("/cart", isAuth, shopController.getCart);

router.post("/cart", isAuth, shopController.postCart);

router.post("/cart-delete-item", isAuth, shopController.deleteCartProduct);

router.get("/orders", isAuth, shopController.getOrders);

router.post("/create-order", isAuth, shopController.postOrders);

// router.get("/checkout", shopController.getCheckout);

module.exports = router;
