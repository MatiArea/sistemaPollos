import { Router } from "express";
const router = Router();

import { validateToken } from "../middlewares/auth";
import {
  addCash,
  createCash,
  getCash,
  removeCash,
  validateCash,
} from "../controllers/cash.controller";

/*-----GET-----*/
router.get("/", validateToken, getCash);
//router.get('/:id',validateToken, );

/*-----POST-----*/
router.post("/new", validateToken, createCash);
router.post("/validate", validateToken, validateCash);

/*-----PUT-----*/
router.put("/add", validateToken, addCash);
router.put("/remove", validateToken, removeCash);

/*-----DELETE-----*/
//router.delete('/delete/:id',validateToken, );

export default router;
