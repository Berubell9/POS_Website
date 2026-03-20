import express from "express";
import { uploadMiddleware, uploadImage } from "../controllers/product-image.js";

const router = express.Router();

router.post("/", uploadMiddleware, uploadImage);

export default router;