import { Router } from "express";
import { login, verifyAuth } from "../controllers/auth-controllers.js";
import verifyToken from "../middleware/verify-token-middlware.js";

const router = Router();

router.post('/login', login);
router.post('/verify-auth', verifyToken, verifyAuth);


export default router;