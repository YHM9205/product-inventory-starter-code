import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Spin } from "antd";
import ProductForm from "./ProductForm";
import {
  getErrorMessage,
  getProductById,
  updateProduct,
} from "../services/productService";

const UpdateProductPage = () => {
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

  const handleUpdate = async (productData) => {
    await updateProduct(id, productData);
    navigate(`/products/${id}`);
  };

  if (loading) return <Spin size="large" />;
  if (error) return <Alert type="error" message={error} showIcon />;

  return (
    <section>
      <h1>Edit product</h1>
      <ProductForm
        initialValues={{
          title: product.title,
          description: product.description ?? "",
          category: product.category,
          price: product.price,
          quantity: product.quantity,
        }}
        submitLabel="Save changes"
        onSubmit={handleUpdate}
      />
    </section>
  );
};

export default UpdateProductPage;
