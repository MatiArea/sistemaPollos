import { Router } from "express";
const router = Router();

import { createExpense, deleteExpense, getAllExpenses, updateExpense } from '../controllers/expense.controller'
import { validateToken } from '../middlewares/auth'

/*-----GET-----*/
router.get('/',validateToken,getAllExpenses);

/*-----POST-----*/
router.post('/new',validateToken,createExpense);

/*-----PUT-----*/
router.put('/update',validateToken,updateExpense);

/*-----DELETE-----*/
router.delete('/delete',validateToken,deleteExpense);

export default router;