import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import { createProduct } from "../services/productService";

const CreateProductPage = () => {
  const navigate = useNavigate();

  const handleCreate = async (productData) => {
    const product = await createProduct(productData);
    navigate(`/products/${product._id}`);
  };

  return (
    <section>
      <h1>Add a product</h1>
      <ProductForm submitLabel="Create product" onSubmit={handleCreate} />
    </section>
  );
};

export default CreateProductPage;
