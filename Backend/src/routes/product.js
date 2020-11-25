import { Router } from "express";
const router = Router();

import { createProduct, deleteProduct, getAllProducts, updateProduct, getOneProduct} from '../controllers/product.controller'
import { validateToken } from "../middlewares/auth";

/*-----GET-----*/
router.get('/',validateToken, getAllProducts);
router.get('/:id',validateToken, getOneProduct);


/*-----POST-----*/
router.post('/new',validateToken, createProduct);

/*-----PUT-----*/
router.put('/update',validateToken, updateProduct);

/*-----DELETE-----*/
router.delete('/delete/:id',validateToken, deleteProduct);

export default router;