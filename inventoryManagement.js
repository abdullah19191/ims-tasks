const Product = require("./models/productSchema");

const checkAndUpdateLowStockProducts = async () => {
  try {
    // Find all products with quantity less than 10
    const lowStockProducts = await Product.find({ quantity: { $lt: 10 } });

    // Update the lowInStock property for each low stock product
    lowStockProducts.forEach(async (product) => {
      product.lowInStock = true;
      await product.save();

      if (product.quantity === 0) {
        console.log(
          `Product "${product.name}" is out of stock.Please restock them.`
        );
      } else {
        console.log(
          `Product "${product.name}" is low in stock.Please restock them.`
        );
      }
    });

    console.log("Low stock products updated successfully.");
  } catch (error) {
    console.error("Error updating low stock products:", error);
  }
};

module.exports = {
  checkAndUpdateLowStockProducts,
};
