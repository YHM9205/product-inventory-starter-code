import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Spin } from "antd";
import { getErrorMessage, getProducts } from "../services/productService";

const AllProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProducts(await getProducts());
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <Spin size="large" />;
  if (error) return <Alert type="error" message={error} showIcon />;

  return (
    <section>
      <h1>All products</h1>
      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <Link to={`/products/${product._id}`}>{product.title}</Link>
                </td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default AllProductPage;
