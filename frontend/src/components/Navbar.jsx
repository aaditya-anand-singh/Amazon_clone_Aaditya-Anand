import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ onSearch }) {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const val = e.target.value;
    setValue(val);
    onSearch(val);
  };

  return (
    <>
      {/* TOP NAV */}
      <div style={styles.nav}>
        <h2 style={styles.logo} onClick={() => navigate("/")}>
          amazon
        </h2>

        <input
          placeholder="Search Amazon.in"
          value={value}
          onChange={handleSearch}
          style={styles.search}
        />

        <div style={styles.right}>
          <span>Hello, User</span>

          <span onClick={() => navigate("/orders")} style={styles.link}>
            Orders
          </span>

          <span onClick={() => navigate("/cart")} style={styles.link}>
            🛒 Cart
          </span>
        </div>
      </div>

      {/* CATEGORY BAR */}
      <div style={styles.subNav}>
        <span>All</span>
        <span>Electronics</span>
        <span>Fashion</span>
        <span>Home</span>
        <span>Mobiles</span>
      </div>
    </>
  );
}

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#131921",
    color: "white",
    padding: "10px 20px",
  },
  logo: {
    color: "#f08804",
    fontWeight: "bold",
    cursor: "pointer",
  },
  search: {
    width: "50%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
  },
  right: {
    display: "flex",
    gap: "20px",
  },
  link: {
    cursor: "pointer",
  },
  subNav: {
    display: "flex",
    gap: "20px",
    background: "#232f3e",
    color: "white",
    padding: "8px 20px",
    fontSize: "14px",
  },
};

export default Navbar;