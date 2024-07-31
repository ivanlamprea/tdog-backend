import { Router } from 'express';
const router = Router();

import { testDog, getDogById, createDog, dogByFilter, listDogByUser, deleteDog, uploadPictures, photo } from "../controllers/dog.js";
import { ensureAuth } from '../middlewares/auth.js';
import multer from "multer";
import Dog from '../models/dog.js';
import { checkEntityExists } from '../middlewares/checkEntityExists.js';

//Configuración de subida de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/dogs/");
    },
    filename: (req, file, cb) => {
        cb(null, "pub-" + Date.now() + "-" + file.originalname);
    }
});

// Middleware para subida de archivos
const uploads = multer({ storage });

router.get('/test-dog', testDog);
router.get('/photo/:file', photo);
router.get('/view/:id', ensureAuth, getDogById);
router.post('/create', ensureAuth, createDog);
router.get('/search', ensureAuth, dogByFilter);
router.get('/list', ensureAuth, listDogByUser);
router.delete('/delete/:id', ensureAuth, deleteDog);
router.post('/upload-pictures/:id', [ensureAuth, checkEntityExists(Dog, 'id'), uploads.array("pictures", 5), uploadPictures]);
export default router;