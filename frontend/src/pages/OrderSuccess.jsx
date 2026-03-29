import { useParams, useNavigate } from "react-router-dom";

function OrderSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>🎉 Order Placed Successfully!</h1>

      <h2>Your Order ID: {id}</h2>

      <button
        onClick={() => navigate("/")}
        style={{ marginTop: "20px", padding: "10px" }}
      >
        Back to Home
      </button>
    </div>
  );
}

export default OrderSuccess;