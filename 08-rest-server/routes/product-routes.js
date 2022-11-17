import { Router } from 'express';
import { check } from 'express-validator';

import  { isAdmin, validate, validateJWT } from '../middlewares/index.js'
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from '../controllers/product-controller.js'
import { productByIdExists } from '../helpers/db-validators.js'

export const routerProduct = Router();


routerProduct.get('/',getProducts);

routerProduct.get('/:id', [
    check('id', 'Invalid Id').isMongoId(),
    check('id').custom(productByIdExists),
    validate
], getProduct);


routerProduct.post('/', [
    validateJWT,
    check('name', 'Name is mandatory').not().isEmpty(),
    check('category', 'Category is mandatory').not().isEmpty(),
    check('category', 'Invalid category Id').isMongoId(),
    validate
], createProduct);

routerProduct.put('/:id', [
    validateJWT,
    // check('category', 'Invalid Id').isMongoId(),
    check('id').custom(productByIdExists),
    validate
], updateProduct)

routerProduct.delete('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'Invalid Id').isMongoId(),
    check('id').custom(productByIdExists),
    validate
], deleteProduct)