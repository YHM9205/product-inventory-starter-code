import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Spin } from "antd";
import {
  getErrorMessage,
  getLowStockProducts,
  getStatistics,
} from "../services/productService";

const StatisticsPage = () => {
  const [stats, setStats] = useState(null);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, lowStockData] = await Promise.all([
          getStatistics(),
          getLowStockProducts(),
        ]);
        setStats(statsData);
        setLowStock(lowStockData);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Spin size="large" />;
  if (error) return <Alert type="error" message={error} showIcon />;

  return (
    <section>
      <h1>Statistics</h1>
      <ul className="details">
        <li>Total products: {stats.totalProducts}</li>
        <li>Total value: ${stats.totalValue}</li>
        <li>Low stock items: {stats.lowStockItems}</li>
      </ul>

      <h2>Low stock (quantity below 3)</h2>
      {lowStock.length === 0 ? (
        <p>Nothing is running low.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {lowStock.map((product) => (
              <tr key={product._id}>
                <td>
                  <Link to={`/products/${product._id}`}>{product.title}</Link>
                </td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default StatisticsPage;
