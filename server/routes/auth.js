const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verify-token");

// signup route

router.post("/auth/signup", async (req, res) => {
	if (!req.body.email || !req.body.password) {
		res.json({ success: false, message: "Please enter email or password" });
	} else {
		try {
			let newUser = new User();
			newUser.name = req.body.name;
			newUser.email = req.body.email;
			newUser.password = req.body.password;
			await newUser.save();

			let token = jwt.sign(newUser.toJSON(), process.env.SECRET, {
				expiresIn: 604800, //1 week
			});

			res.json({
				success: true,
				token: token,
				message: "Successfully created a new user",
			});
		} catch (err) {
			res.status(500).json({
				success: false,
				message: err.message,
			});
		}
	}
});

// profile route
router.get("/auth/user", verifyToken, async (req, res) => {
	try {
		let foundUser = await User.findOne({ _id: req.decoded._id });
		if (foundUser) {
			res.json({
				success: true,
				user: foundUser,
			});
		}
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
});

// login route
router.post("/auth/login", async (req, res) => {
	try {
		let foundUser = await User.findOne({
			email: req.body.email,
		});
		if (!foundUser) {
			res.status(403).json({
				success: false,
				message: "Authentication failed, User not found",
			});
		} else {
			if (foundUser.comparePassword(req.body.password)) {
				let token = jwt.sign(foundUser.toJSON(), process.env.SECRET, {
					expiresIn: 604800, // 1week
				});

				res.json({ success: true, token: token });
			} else {
				res.status(403).json({
					success: false,
					message: "Authentication failed, Wrong password",
				});
			}
		}
	} catch {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
});

module.exports = router;
