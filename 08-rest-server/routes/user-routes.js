import { Router } from 'express';
import { userDelete, userGet, userPatch, userPost, userPut } from '../controllers/user-controller.js';

export const router = Router();

// GET
router.get('/', userGet);

// PUT
router.put('/:id', userPut);

// POST
router.post('/', userPost);

// DELETE
router.delete('/', userDelete);

// PATCH
router.patch('/', userPatch);




export { Router }