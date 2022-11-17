import { Router } from 'express';
import { check } from 'express-validator';

import { search } from '../controllers/search-controller.js';

export const routerSearch = Router();

routerSearch.get('/:collection/:term', [

],search);
