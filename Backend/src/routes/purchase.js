import { Router } from "express";
const router = Router();

import { createPurchase, deletePurchase, getAllPurchases, updatePurchase } from '../controllers/purchase.controller'

/*-----GET-----*/
router.get('/', getAllPurchases);

/*-----POST-----*/

/*-----PUT-----*/
router.put('/new', createPurchase);
router.put('/update/:id', updatePurchase);

/*-----DELETE-----*/
router.delete('/delete/:id', deletePurchase);

export default router;