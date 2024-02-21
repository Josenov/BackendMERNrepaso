import express from 'express'
import authController from '../controllers/auth.controller.js'
import { accountExistsSignUp } from '../middlewares/auth/accountExistsSignUp.js'

const {signUp} = authController;

const router = express.Router();

router.post('/signup',accountExistsSignUp ,signUp)

export default router;