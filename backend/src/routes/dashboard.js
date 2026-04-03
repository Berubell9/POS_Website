import express from "express";
import { getDashboardCharts } from "../controllers/dashboard.js";

const router = express.Router();

router.get("/charts", getDashboardCharts);

export default router;