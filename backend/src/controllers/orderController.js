const prisma = require("../config/db");

// ✅ PLACE ORDER (UPDATED)
exports.placeOrder = async (req, res) => {
  try {
    const { name, phone, pincode, city, state, address } = req.body;

    // 🔥 VALIDATION
    if (!name || !phone || !pincode || !city || !state || !address) {
      return res.status(400).json({ message: "All address fields required" });
    }

    // 1. Get cart items
    const cartItems = await prisma.cartItem.findMany();

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2. Get products in ONE query
    const productIds = cartItems.map(item => item.productId);

    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds }
      }
    });

    let totalAmount = 0;

    // 🔥 VALIDATION + TOTAL
    for (let item of cartItems) {
      const product = products.find(p => p.id === item.productId);

      if (!product) {
        return res.status(400).json({ message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`
        });
      }

      totalAmount += product.price * item.quantity;
    }

    // ✅ CREATE ORDER (WITH ADDRESS)
    const order = await prisma.order.create({
      data: {
        totalAmount,
        name,
        phone,
        pincode,
        city,
        state,
        address
      }
    });

    // ✅ CREATE ORDER ITEMS (BULK)
    const orderItemsData = cartItems.map(item => {
      const product = products.find(p => p.id === item.productId);

      return {
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: product.price
      };
    });

    await prisma.orderItem.createMany({
      data: orderItemsData
    });

    // 🔥 UPDATE STOCK (SAFE + FAST)
    await Promise.all(
      cartItems.map(item =>
        prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        })
      )
    );

    // ✅ CLEAR CART
    await prisma.cartItem.deleteMany();

    // ✅ RESPONSE
    res.json({
      message: "Order placed successfully ✅",
      orderId: order.id
    });

  } catch (error) {
  console.log("🔥 FULL ERROR:", error);
  res.status(500).json({ error: "Error placing order" });
}
};



// ✅ GET ALL ORDERS (IMPROVED)
exports.getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            product: true // 🔥 show product details
          }
        }
      },
      orderBy: {
        id: "desc"
      }
    });

    res.json(orders);

  } catch (error) {
    console.log("GET ORDERS ERROR:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};