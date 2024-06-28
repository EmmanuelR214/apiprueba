import { Router } from "express";
import { PostLogout, getDatos, verifYToken } from "../controllers/datos.controlles.js";

const router = Router();

router.get('/traerdatos', getDatos)

router.get('/verify', verifYToken)

router.post('/logout', PostLogout)

export default router