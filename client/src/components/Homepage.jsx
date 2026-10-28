import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <section className="home">
      <h1>Product inventory</h1>
      <p>Track what you sell, see what is running low, and keep prices up to date.</p>
      <div className="home-actions">
        <Link to="/products" className="button">
          View products
        </Link>
        <Link to="/products/create" className="button secondary">
          Add a product
        </Link>
      </div>
    </section>
  );
};

export default Homepage;
