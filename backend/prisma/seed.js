const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      // 📱 ELECTRONICS
      {
        name: "iPhone 13",
        description: "Apple smartphone",
        price: 59999,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        stock: 10
      },
      {
        name: "Samsung Galaxy S21",
        description: "Android phone",
        price: 49999,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
        stock: 12
      },
      {
        name: "Dell Laptop",
        description: "Powerful laptop",
        price: 75000,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
        stock: 5
      },
      {
        name: "Wireless Earbuds",
        description: "Noise cancelling",
        price: 2999,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
        stock: 25
      },
      {
        name: "Smart Watch",
        description: "Fitness tracking",
        price: 4999,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
        stock: 15
      },

      // 👕 FASHION
      {
        name: "Running Shoes",
        description: "Comfortable shoes",
        price: 1999,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        stock: 20
      },
      {
        name: "Men T-Shirt",
        description: "Cotton wear",
        price: 599,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        stock: 30
      },
      {
        name: "Jeans",
        description: "Slim fit",
        price: 1499,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
        stock: 18
      },
      {
        name: "Women's Dress",
        description: "Stylish dress",
        price: 2499,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
        stock: 10
      },

      // 🏠 HOME
      {
        name: "Cookware Set",
        description: "Non-stick cookware",
        price: 3499,
        category: "home",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
        stock: 10
      },
      {
        name: "Mixer Grinder",
        description: "Kitchen appliance",
        price: 2999,
        category: "home",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
        stock: 8
      },
      {
        name: "Water Bottle",
        description: "Insulated bottle",
        price: 499,
        category: "home",
        image: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845",
        stock: 40
      },

      // 💻 ACCESSORIES
      {
        name: "Gaming Mouse",
        description: "RGB mouse",
        price: 999,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7",
        stock: 25
      },
      {
        name: "Mechanical Keyboard",
        description: "RGB keyboard",
        price: 2999,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        stock: 12
      },

      // 📚 BOOKS
      {
        name: "Atomic Habits",
        description: "Self improvement",
        price: 499,
        category: "books",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
        stock: 50
      },
      {
        name: "Rich Dad Poor Dad",
        description: "Finance book",
        price: 399,
        category: "books",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
        stock: 35
      }
    ]
  });

  console.log("✅ Products Added Successfully!");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());