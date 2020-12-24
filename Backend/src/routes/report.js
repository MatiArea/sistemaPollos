import { Router } from "express";
import { dayReport } from "../controllers/report.controller";
const router = Router();

import { validateToken } from "../middlewares/auth";

/*-----GET-----*/
router.get('/dayreport',validateToken,dayReport);


export default router;