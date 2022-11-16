import { Router } from 'express';
import { check } from 'express-validator';

import  { isAdmin, validate, validateJWT } from '../middlewares/index.js'
import { createCategory, getCategories, getCategory, updateCategory, deleteCategory } from '../controllers/category-controller.js'
import { categoryByIdExists } from '../helpers/db-validators.js'

export const routerCategory = Router();


routerCategory.get('/',getCategories);

routerCategory.get('/:id', [
    check('id', 'Invalid Id').isMongoId(),
    check('id').custom(categoryByIdExists),
    validate
], getCategory);


routerCategory.post('/', [
    validateJWT,
    check('name', 'Name is mandatory').not().isEmpty(),
    validate
], createCategory);

routerCategory.put('/:id', [
    validateJWT,
    check('name', 'Name is mandatory').not().isEmpty(),
    check('id').custom(categoryByIdExists),
    validate
], updateCategory)

routerCategory.delete('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'Invalid Id').isMongoId(),
    check('id').custom(categoryByIdExists),
    validate
], deleteCategory)