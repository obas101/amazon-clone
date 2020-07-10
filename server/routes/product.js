const router = require("express").Router();
const Product = require("../models/product");

//post request - creates a new product
router.post("/products", async (req, res) => {
  try {
    let product = new Product();
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = req.body.photo;
    product.stockQuantity.req.body.stockQuantity;

    await product.save();

    res.json({
      status: true,
      message: "Successfully saved",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//get request - get all products
router.get("/products", async (req, res) => {
  try {
    let products = await Product.find();
    res.json({
      success: true,
      products: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//get request - get a single product
router.get("/products/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });
    res.json({
      success: true,
      product: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//put request - update a single product
router.put("/products/:id", async (req, res) => {
  try {
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id }, 
      {
      $set: {
        title: req.body.title,
        price: req.body.price,
        category: req.body.categoryId,
        photo: req.file.location,
        description: req.body.description,
        owner: req.body.ownerID
      },
    },
    {
      upsert: true
    });
    res.json({
      success: true,
      product: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//delete request - deletea a single product

module.exports = router;
