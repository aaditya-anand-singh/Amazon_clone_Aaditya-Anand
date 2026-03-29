import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = () => {
    axios
      .get("http://localhost:5000/api/cart")
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/cart/${id}`);
    fetchCart();
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    await axios.put("http://localhost:5000/api/cart/update", {
      id,
      quantity,
    });

    fetchCart();
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div style={{ background: "#EAEDED", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>🛒 Shopping Cart</h1>

      {items.length === 0 ? (
        <h2>Your cart is empty 😕</h2>
      ) : (
        <div style={{ display: "flex", gap: "20px" }}>
          
          {/* LEFT SIDE (ITEMS) */}
          <div style={{ flex: 3 }}>
            {items.map((item) => (
              <div key={item.id} style={styles.card}>
                
                <img src={item.product.image} style={styles.image} />

                <div style={{ flex: 1 }}>
                  <h3>{item.product.name}</h3>
                  <p style={{ color: "green" }}>In Stock</p>
                  <p>₹{item.product.price}</p>

                  {/* QUANTITY */}
                  <div style={styles.qty}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>

                  <p>
                    Subtotal: ₹{item.product.price * item.quantity}
                  </p>

                  <button onClick={() => removeItem(item.id)} style={styles.remove}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE (TOTAL BOX) */}
          <div style={styles.summary}>
            <h2>
              Subtotal ({items.length} items): <br />
              <span style={{ color: "#B12704" }}>₹{total}</span>
            </h2>

            <button
              onClick={() => navigate("/checkout")}
              style={styles.checkout}
            >
              Proceed to Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    gap: "20px",
    background: "white",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)"
  },
  image: {
    width: "120px",
    height: "120px",
    objectFit: "contain"
  },
  qty: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    margin: "10px 0"
  },
  remove: {
    background: "none",
    border: "none",
    color: "#007185",
    cursor: "pointer"
  },
  summary: {
    flex: 1,
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    height: "fit-content",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)"
  },
  checkout: {
    width: "100%",
    marginTop: "15px",
    padding: "10px",
    background: "#FFD814",
    border: "1px solid #FCD200",
    cursor: "pointer"
  }
};

export default Cart;