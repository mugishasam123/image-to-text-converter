import { Router } from 'express';
import { getIndexView, handleImageConvert } from '../controllers/controller.js';

export const router = Router();

router.get("/", getIndexView);
router.post("/upload", handleImageConvert);
