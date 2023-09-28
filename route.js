const express = require("express");
const router = express.Router();
const {
  addProducts,
  updateProduct,
  deleteProduct,
  singleProduct,
  lowInStockProducts,
} = require("./controllers/productController");

// Endpoint to add a new product
router.post("/products", addProducts);

// Endpoint to update a product by ID
router.put("/products/:productId", updateProduct);

// Endpoint to delete a product by ID
router.delete("/products/:productId", deleteProduct);

//Endpoint to get single product details
router.get("/products/:productId", singleProduct);

// Endpoint to List All Products with a Filter for "Low in Stock" Products
router.get("/products", lowInStockProducts);

module.exports = router;
