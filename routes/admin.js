const path = require("path");
const router = require("express").Router();
const isAuth = require("../middleware/is-auth");
const adminController = require("../controller/admin");

// /admin/ => GET {lists all products to admin}
router.get("/", adminController.getProducts);

// /admin/add-product => GET {renders product add form}
router.get("/add-product", isAuth, adminController.getAddProductPage);

// /admin/add-product => POST {receives & processes submission of product}
router.post("/add-product", isAuth, adminController.addProduct);

router.get("/edit-product/:id", isAuth, adminController.getEditProduct);

router.post("/edit-product/", isAuth, adminController.editProduct);

router.post("/delete-product/", isAuth, adminController.deleteProduct);

module.exports = router;
