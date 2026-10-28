import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import AllProductPage from "./components/AllProductPage";
import ProductDetailsPage from "./components/ProductDetailsPage";
import CreateProductPage from "./components/CreateProductPage";
import UpdateProductPage from "./components/UpdateProductPage";
import StatisticsPage from "./components/StatisticsPage";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="page">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<AllProductPage />} />
          <Route path="/products/create" element={<CreateProductPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/products/:id/edit" element={<UpdateProductPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
