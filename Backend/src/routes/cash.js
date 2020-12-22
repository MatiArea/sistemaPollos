import { Router } from "express";
const router = Router();

import { validateToken } from "../middlewares/auth";
import { createCash, getCash, updateCash } from "../controllers/cash.controller";

/*-----GET-----*/
router.get('/',validateToken,getCash);
//router.get('/:id',validateToken, );


/*-----POST-----*/
router.post('/new',validateToken,createCash);

/*-----PUT-----*/
router.put('/update',validateToken,updateCash);

/*-----DELETE-----*/
//router.delete('/delete/:id',validateToken, );

export default router;