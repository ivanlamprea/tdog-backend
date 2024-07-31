import { Router } from 'express';
const router = Router();

import { listCity } from "../controllers/city.js";

router.get('/list', listCity);
export default router;