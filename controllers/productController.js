const Product = require("../models/productSchema");

const addProducts = async (req, res) => {
  try {
    const { name, supplier, quantity } = req.body;

    const product = new Product({
      name,
      supplier,
      quantity,
      lowInStock: quantity < 10,
    });

    await product.save();

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, supplier, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.name = name;
    product.supplier = supplier;
    product.quantity = quantity;
    product.lowInStock = quantity < 10;

    await product.save();

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByIdAndRemove(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const lowInStockProducts = async (req, res) => {
  try {
    const { lowInStock } = req.query;
    let query = {};

    if (lowInStock === "true") {
      query.lowInStock = true;
    }

    const products = await Product.find(query);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addProducts,
  updateProduct,
  deleteProduct,
  singleProduct,
  lowInStockProducts,
};
