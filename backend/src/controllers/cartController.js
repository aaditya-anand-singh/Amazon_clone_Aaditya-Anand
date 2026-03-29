const prisma = require("../config/db");

// ADD to cart (increase quantity if exists)
exports.addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const existing = await prisma.cartItem.findFirst({
      where: { productId }
    });

    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + 1 }
      });
      return res.json(updated);
    }

    const item = await prisma.cartItem.create({
      data: {
        productId,
        quantity: 1
      }
    });

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Error adding to cart" });
  }
};

// GET cart items with product details
exports.getCartItems = async (req, res) => {
  try {
    const items = await prisma.cartItem.findMany();

    const detailed = await Promise.all(
      items.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId }
        });

        return {
          ...item,
          product
        };
      })
    );

    res.json(detailed);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cart" });
  }
};

// UPDATE quantity
exports.updateQuantity = async (req, res) => {
  try {
    const { id, quantity } = req.body;

    const updated = await prisma.cartItem.update({
      where: { id },
      data: { quantity }
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Error updating quantity" });
  }
};

// REMOVE item
exports.removeFromCart = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.cartItem.delete({
      where: { id }
    });

    res.json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ error: "Error removing item" });
  }
};