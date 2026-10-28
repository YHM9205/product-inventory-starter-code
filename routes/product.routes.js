const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();
const Product = require("../models/Product");

// Validate :id for every route that has it (this runs before the handlers below)
router.param("id", (req, res, next, id) => {
  if (!mongoose.isObjectIdOrHexString(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
  next();
});

// CREATE - POST /
router.post("/", async (req, res) => {
  try {
    const { title, description, category, price, quantity } = req.body;
    const createdProduct = await Product.create({
      title,
      description,
      category,
      price,
      quantity,
    });
    res.status(201).json(createdProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// READ ALL - GET /
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// LOW STOCK - GET /low-stock (must be above /:id)
router.get("/low-stock", async (req, res) => {
  try {
    const lowStockProducts = await Product.find({ quantity: { $lt: 3 } });
    res.json(lowStockProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// STATISTICS - GET /statistics (must be above /:id)
router.get("/statistics", async (req, res) => {
  try {
    const [stats] = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          totalValue: { $sum: { $multiply: ["$price", "$quantity"] } },
          lowStockItems: { $sum: { $cond: [{ $lt: ["$quantity", 3] }, 1, 0] } },
        },
      },
    ]);
    res.json(
      stats
        ? { totalProducts: stats.totalProducts, totalValue: stats.totalValue, lowStockItems: stats.lowStockItems }
        : { totalProducts: 0, totalValue: 0, lowStockItems: 0 }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// READ ONE - GET /:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - PUT /:id
router.put("/:id", async (req, res) => {
  try {
    const { title, description, category, price, quantity } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { title, description, category, price, quantity },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE - DELETE /:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
