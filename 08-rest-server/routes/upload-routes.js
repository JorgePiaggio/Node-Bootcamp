import { Router } from 'express';
import { check } from 'express-validator';
import { uploadFile } from '../controllers/upload-controller.js';
import  { validate } from '../middlewares/index.js'

export const routerUpload = Router();

routerUpload.post('/', uploadFile);