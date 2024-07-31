import { Router } from 'express';
const router = Router();

import { listBreed } from "../controllers/breed.js";

router.get('/list', listBreed);
export default router;