import { useState } from "react";
import { Alert } from "antd";
import { getErrorMessage } from "../services/productService";

const CATEGORIES = ["electronics", "food", "clothing", "furniture", "other"];

const emptyForm = {
  title: "",
  description: "",
  category: "electronics",
  price: "",
  quantity: "",
};

const ProductForm = ({ initialValues = emptyForm, submitLabel, onSubmit }) => {
  const [form, setForm] = useState(initialValues);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // the error is set only after the user submits, not while they type
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      {error && <Alert type="error" message={error} showIcon />}

      <label>
        Title
        <input name="title" value={form.title} onChange={handleChange} required />
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          maxLength={500}
        />
      </label>

      <label>
        Category
        <select name="category" value={form.category} onChange={handleChange}>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label>
        Price
        <input
          name="price"
          type="number"
          step="0.01"
          min="0.1"
          value={form.price}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Quantity
        <input
          name="quantity"
          type="number"
          min="0"
          value={form.quantity}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit" className="button" disabled={submitting}>
        {submitLabel}
      </button>
    </form>
  );
};

export default ProductForm;
