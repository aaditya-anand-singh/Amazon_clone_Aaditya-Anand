import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home({ search }) {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addToCart = async (id) => {
    await axios.post("http://localhost:5000/api/cart/add", {
      productId: id,
    });
    alert("Added to cart ✅");
  };

  // ✅ FILTER FROM NAVBAR SEARCH
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: "#EAEDED", minHeight: "100vh" }}>
      
      {/* 🔥 HERO BANNER */}
      <img
  src="https://images.unsplash.com/photo-1607083206968-13611e3d76db"
  style={{ width: "100%", height: "300px", objectFit: "cover" }}
/>

      <div style={styles.container}>
        
        {/* 🔥 PRODUCT GRID */}
        <div style={styles.grid}>
          {filtered.map((p) => (
            <div
              key={p.id}
              style={styles.card}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img src={p.image} style={styles.image} />

              <h4
                onClick={() => navigate(`/product/${p.id}`)}
                style={styles.title}
              >
                {p.name}
              </h4>

              <p style={styles.price}>₹{p.price}</p>

              <button
                onClick={() => addToCart(p.id)}
                style={styles.button}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <h2 style={{ textAlign: "center", marginTop: "50px" }}>
            No products found 😕
          </h2>
        )}
      </div>

      {/* 🔥 FOOTER */}
      <div style={styles.footer}>
        <p>© 2026 Amazon Clone | Built by You 🚀</p>
      </div>
    </div>
  );
}

const styles = {
  hero: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    marginBottom: "-120px", // 🔥 overlap effect like Amazon
  },
  container: {
    padding: "20px",
    marginTop: "100px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    transition: "0.2s",
    boxShadow: "0 0 8px rgba(0,0,0,0.1)",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "contain",
  },
  title: {
    fontSize: "14px",
    margin: "10px 0",
    color: "#007185",
    cursor: "pointer",
  },
  price: {
    color: "#B12704",
    fontWeight: "bold",
    fontSize: "18px",
  },
  button: {
    background: "#FFD814",
    border: "1px solid #FCD200",
    padding: "8px",
    marginTop: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
  footer: {
    textAlign: "center",
    padding: "20px",
    background: "#131921",
    color: "white",
    marginTop: "40px",
  },
};

export default Home;