import { Router } from "express";
const router = Router();

import { createClient, deleteClient, getAllClients, getOneClient, updateBalance, updateClient } from '../controllers/client.controller'
import { validateToken } from "../middlewares/auth";


/*-----GET-----*/
router.get('/',validateToken,getAllClients);
router.get('/:id',validateToken,getOneClient);

/*-----POST-----*/
router.post('/new',validateToken,createClient);

/*-----PUT-----*/
router.put('/update',validateToken,updateClient);
router.put('/updatebalance',validateToken,updateBalance);

/*-----DELETE-----*/
router.delete('/delete/:id',validateToken,deleteClient);

export default router;