import { useEffect, useState } from "react";
import axios from "axios";

function Checkout() {
  const [items, setItems] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    address: ""
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cart")
      .then((res) => setItems(res.data));
  }, []);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    const { name, phone, pincode, city, state, address } = form;

    if (!name || !phone || !pincode || !city || !state || !address) {
      alert("Please fill all fields ❗");
      return;
    }

    const res = await axios.post(
  "http://localhost:5000/api/orders/place",
  form   // 🔥 SEND ADDRESS DATA
);

    window.location.href = `/order-success/${res.data.orderId}`;
  };

  return (
    <div style={{ background: "#EAEDED", minHeight: "100vh", padding: "20px" }}>
      <h1>Checkout 🧾</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        
        {/* LEFT — ADDRESS */}
        <div style={styles.left}>
          <h3>Shipping Address</h3>

          <input name="name" placeholder="Full Name" onChange={handleChange} style={styles.input} />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} style={styles.input} />
          <input name="pincode" placeholder="Pincode" onChange={handleChange} style={styles.input} />
          <input name="city" placeholder="City" onChange={handleChange} style={styles.input} />
          <input name="state" placeholder="State" onChange={handleChange} style={styles.input} />
          <textarea name="address" placeholder="Full Address" onChange={handleChange} style={styles.textarea} />
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <div style={styles.right}>
          <h3>Order Summary</h3>

          {items.map((item) => (
            <div key={item.id} style={styles.item}>
              <span>{item.product.name} × {item.quantity}</span>
              <span>₹{item.product.price * item.quantity}</span>
            </div>
          ))}

          <hr />

          <h2>Total: ₹{total}</h2>

          <button onClick={placeOrder} style={styles.button}>
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
}

const styles = {
  left: {
    flex: 2,
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)"
  },
  right: {
    flex: 1,
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    height: "fit-content",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)"
  },
  input: {
    display: "block",
    width: "100%",
    margin: "10px 0",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px"
  },
  textarea: {
    display: "block",
    width: "100%",
    margin: "10px 0",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    height: "80px"
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0"
  },
  button: {
    width: "100%",
    marginTop: "15px",
    padding: "10px",
    background: "#FFD814",
    border: "1px solid #FCD200",
    cursor: "pointer",
    borderRadius: "5px"
  }
};

export default Checkout;