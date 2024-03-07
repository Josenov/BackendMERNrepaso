import express from 'express'
import authController from '../controllers/auth.controller.js'
import { accountExistsSignUp } from '../middlewares/auth/accountExistsSignUp.js'
import { accountExistsSignIn } from '../middlewares/auth/accountExistsSignIn.middleware.js'
import { accountHasBeenVerified } from '../middlewares/auth/accountHasBeenVerified.middleware.js'
import { passwordIsOk } from '../middlewares/auth/passwordIsOk.middleware.js'
import passport from 'passport'
import {validator} from '../middlewares/validator.js'
import {signInUserSchema} from '../schema/user.schema.js'

const {signUp, signIn, signOut, token, googleSignIn} = authController;

const router = express.Router();

router.post('/signup',accountExistsSignUp ,signUp)

router.post('/signin',validator(signInUserSchema),accountExistsSignIn,accountHasBeenVerified, passwordIsOk,signIn)

router.post('/google', googleSignIn)

router.post('/signout',passport.authenticate('jwt',{session:false}),signOut )

router.post('/token',passport.authenticate('jwt',{session:false}),token )

export default router;