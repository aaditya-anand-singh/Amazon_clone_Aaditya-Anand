const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCartItems,
  removeFromCart,
  updateQuantity
} = require("../controllers/cartController");

router.post("/add", addToCart);
router.get("/", getCartItems);
router.put("/update", updateQuantity);
router.delete("/:id", removeFromCart);

module.exports = router;