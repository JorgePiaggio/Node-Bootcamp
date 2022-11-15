import { Router } from 'express';
import { check } from 'express-validator';

import  { validate, validateJWT } from '../middlewares/index.js'
import { createCategory } from '../controllers/category-controller.js'

export const routerCategory = Router();


routerCategory.get('/', (req, res) => {
    res.json('Ok')
})

routerCategory.get('/:id', (req, res) => {
    res.json('Ok')
})


routerCategory.post('/', [
     validateJWT,
     check('name', 'Name is mandatory').not().isEmpty(),
     validate
    ], createCategory);

routerCategory.put('/:id', (req, res) => {
    res.json('put')
})

routerCategory.delete('/:id', (req, res) => {
    res.json('delete')
})