import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        Inventory
      </Link>
      <div className="nav-links">
        <Link to="/products">All products</Link>
        <Link to="/products/create">Add product</Link>
        <Link to="/statistics">Statistics</Link>
      </div>
    </nav>
  );
};

export default Navbar;
