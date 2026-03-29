import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ background: "#EAEDED", minHeight: "100vh", padding: "20px" }}>
      <h1>📦 Your Orders</h1>

      {orders.length === 0 ? (
        <h2>No orders yet 😕</h2>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={styles.card}>
            
            <div style={styles.header}>
              <p><b>Order ID:</b> {order.id}</p>
              <p><b>Total:</b> ₹{order.totalAmount}</p>
            </div>

            {/* 🔥 PRODUCTS INSIDE ORDER */}
            {order.orderItems.map((item) => (
              <div key={item.id} style={styles.item}>
                <p>Product ID: {item.productId}</p>
                <p>Qty: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
              </div>
            ))}

          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "15px",
    marginTop: "15px",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px"
  },
  item: {
    borderTop: "1px solid #eee",
    paddingTop: "10px",
    marginTop: "10px"
  }
};

export default Orders;