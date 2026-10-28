import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert, Spin } from "antd";
import {
  deleteProduct,
  getErrorMessage,
  getProductById,
} from "../services/productService";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setProduct(await getProductById(id));
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      navigate("/products");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (loading) return <Spin size="large" />;
  if (error) return <Alert type="error" message={error} showIcon />;

  return (
    <section>
      <h1>{product.title}</h1>
      <p>{product.description || "No description."}</p>
      <ul className="details">
        <li>Category: {product.category}</li>
        <li>Price: ${product.price}</li>
        <li>Quantity: {product.quantity}</li>
      </ul>
      <div className="home-actions">
        <Link to={`/products/${id}/edit`} className="button">
          Edit
        </Link>
        <button type="button" className="button danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
