import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACK_END_SERVER_URL}/products`,
});

// READ ALL - GET /
export const getProducts = async () => (await api.get("/")).data;

// READ ONE - GET /:id
export const getProductById = async (productId) =>
  (await api.get(`/${productId}`)).data;

// LOW STOCK - GET /low-stock
export const getLowStockProducts = async () =>
  (await api.get("/low-stock")).data;

// STATISTICS - GET /statistics
export const getStatistics = async () => (await api.get("/statistics")).data;

// CREATE - POST /
export const createProduct = async (productData) =>
  (await api.post("/", productData)).data;

// UPDATE - PUT /:id
export const updateProduct = async (productId, productData) =>
  (await api.put(`/${productId}`, productData)).data;

// DELETE - DELETE /:id
export const deleteProduct = async (productId) =>
  (await api.delete(`/${productId}`)).data;

// pulls the message the backend sent, or falls back to the axios message
export const getErrorMessage = (error) =>
  error.response?.data?.message ||
  error.response?.data?.error ||
  error.message;
