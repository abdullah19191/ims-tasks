const express = require("express");
const productRoutes = require("./route");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const schedule = require("node-schedule");
const { checkAndUpdateLowStockProducts } = require("./inventoryManagement"); // Import the function

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/myroute", productRoutes);

schedule.scheduleJob("*/10 * * * *", checkAndUpdateLowStockProducts);

// Connect to DB and start server
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    // listen for Request
    app.listen(PORT, () => {
      console.log("listening to port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
