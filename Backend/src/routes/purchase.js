import { Router } from "express";
const router = Router();

import { createPurchase, deletePurchase, getAllPurchases, updatePurchase } from '../controllers/purchase.controller'

/*-----GET-----*/
router.get('/', getAllPurchases);

/*-----POST-----*/
router.post('/new', createPurchase);

/*-----PUT-----*/
router.put('/update/:id', updatePurchase);

/*-----DELETE-----*/
router.delete('/delete/:id', deletePurchase);

export default router;