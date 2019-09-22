const path = require("path"),
  router = require("express").Router();

const adminController = require("../controller/admin");

// /admin/ => GET {lists all products to admin}
router.get("/", adminController.getProducts);

// /admin/add-product => GET {renders product add form}
router.get("/add-product", adminController.getAddProductPage);

// /admin/add-product => POST {receives & processes submission of produc}
router.post("/add-product", adminController.addProduct);

router.get("/edit-product/:id", adminController.getEditProduct);

router.post("/edit-product/", adminController.editProduct);

module.exports = router;
