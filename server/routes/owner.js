const router = require("express").Router();
const Owner = require("../models/owner");

//post request
router.post("/owners", async (req, res) => {
  try {
    const owner = new Owner();
    owner.name = req.body.name;
    owner.about = req.body.about;

    await owner.save();

    res.json({
      success: true,
      message: "Successfully created a new owner",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//get api
router.get("/owners", async (req, res) => {
  try {
    let owners = await Owner.find();

    res.json({
      owners: owners,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;