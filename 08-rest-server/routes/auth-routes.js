import { Router } from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/auth-controller.js'
import  { validate } from '../middlewares/index.js'

export const routerAuth = Router();

routerAuth.post('/login', [
    check('mail', 'Mail is mandatory').isEmail(),
    check('password', 'Password is mandatory').not().isEmpty(),
    validate
], login);

