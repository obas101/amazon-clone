const router = require("express").Router();
const Product = require("../models/product");

const upload = require("../middlewares/uploadPhoto");

//post request - creates a new product
router.post("/products", upload.single("photo"), async (req, res) => {
	try {
		let product = new Product();
		product.title = req.body.title;
		product.description = req.body.description;
		product.photo = req.file.location;
		product.stockQuantity = req.body.stockQuantity;
		product.ownerID = req.body.ownerID;
		product.categoryID = req.body.categoryID;
		product.price = req.body.price;

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
		let products = await Product.find().populate("owner").populate("category");
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
router.put("/products/:id", upload.single("photo"), async (req, res) => {
	try {
		let product = await Product.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					title: req.body.title,
					price: req.body.price,
					category: req.body.categoryID,
					photo: req.file.location,
					description: req.body.description,
					owner: req.body.ownerID,
					stockQuantity: req.body.stockQuantity,
				},
			},
			{
				upsert: true,
			},
		);
		res.json({
			success: true,
			updatedProduct: product,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
});

//delete request - deletea a single product
router.delete("/products/:id", async (req, res) => {
	try {
		let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });
		if (deletedProduct) {
			res.json({
				success: true,
				message: "successfully deleted a product",
			});
		}
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
});

module.exports = router;
