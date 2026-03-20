import express from "express";
import cors from "cors";

import productRoutes from "./routes/product.js";
import categoryRoutes from "./routes/category.js";
import productImageRoutes from "./routes/product-image.js";
import tableRoutes from "./routes/table.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/product-images", productImageRoutes);
app.use("/api/tables", tableRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Hello, I am working with Supabase!");
});

// 404 handler
app.use((req, res) => {
    res.status(404).send("Route not found!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});