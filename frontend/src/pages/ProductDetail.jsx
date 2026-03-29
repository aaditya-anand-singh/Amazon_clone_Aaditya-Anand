import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  const addToCart = async () => {
    await axios.post("http://localhost:5000/api/cart/add", {
      productId: product.id,
    });
    alert("Added to cart ✅");
  };

  const buyNow = async () => {
    await axios.post("http://localhost:5000/api/cart/add", {
      productId: product.id,
    });

    navigate("/checkout");
  };

  return (
    <div style={{ background: "#EAEDED", minHeight: "100vh", padding: "20px" }}>
      
      <div style={styles.container}>
        
        {/* LEFT — IMAGE */}
        <div style={styles.left}>
          <img src={product.image} style={styles.image} />
        </div>

        {/* MIDDLE — DETAILS */}
        <div style={styles.middle}>
          <h2>{product.name}</h2>

          <p style={styles.price}>₹{product.price}</p>

          <p>{product.description}</p>

          <p style={{ color: "green" }}>
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          <h4>Product Details:</h4>
          <ul>
            <li>High Quality Product</li>
            <li>Fast Delivery</li>
            <li>Best in category</li>
          </ul>
        </div>

        {/* RIGHT — BUY BOX */}
        <div style={styles.right}>
          <h2 style={styles.price}>₹{product.price}</h2>

          <p style={{ color: "green" }}>In Stock</p>

          <button onClick={addToCart} style={styles.cartBtn}>
            Add to Cart
          </button>

          <button onClick={buyNow} style={styles.buyBtn}>
            Buy Now
          </button>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "20px",
    background: "white",
    padding: "20px",
    borderRadius: "8px"
  },
  left: {
    flex: 1
  },
  image: {
    width: "100%",
    height: "300px",
    objectFit: "contain"
  },
  middle: {
    flex: 2
  },
  right: {
    flex: 1,
    border: "1px solid #ccc",
    padding: "20px",
    borderRadius: "8px",
    height: "fit-content"
  },
  price: {
    color: "#B12704",
    fontWeight: "bold"
  },
  cartBtn: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    background: "#FFD814",
    border: "1px solid #FCD200",
    cursor: "pointer"
  },
  buyBtn: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    background: "#FFA41C",
    border: "none",
    cursor: "pointer"
  }
};

export default ProductDetail;