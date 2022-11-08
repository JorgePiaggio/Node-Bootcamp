import { Router } from 'express';
import { check } from 'express-validator';

import { userDelete, userGet, userPatch, userPost, userPut } from '../controllers/user-controller.js';
import validate from '../middlewares/validator.js'
import { isRoleValid, emailExists, userByIdExists } from '../helpers/db-validators.js';

export const router = Router();

// GET
router.get('/', userGet);

// PUT
router.put('/:id',[
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( userByIdExists ),
    check('role').custom( isRoleValid ),
    validate
], userPut);

// POST
router.post('/', [
    check('name', 'Name is mandatory').not().isEmpty(),
    check('password', 'Password is mandatory. Length 6-20 chars').isLength({min: 6, max: 20}),
    check('mail', 'Invalid email').isEmail(),
    check('mail').custom( emailExists ),
    check('role').custom( isRoleValid ),
    validate
], userPost);

// DELETE
router.delete('/:id',[
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( userByIdExists ),
    validate
], userDelete);

// PATCH
router.patch('/', userPatch);




export { Router }