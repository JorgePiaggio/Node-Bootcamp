import { Router } from 'express';
import { check } from 'express-validator';
import { uploadFile, updateImage } from '../controllers/upload-controller.js';
import  { validate, validateFile } from '../middlewares/index.js'
import { allowedCollections } from '../helpers/db-validators.js';

export const routerUpload = Router();

routerUpload.post('/', validateFile, uploadFile);

routerUpload.put('/:collection/:id', [
    validateFile,
    check('id', 'Invalid Id').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users', 'products'])),
    validate
], updateImage);