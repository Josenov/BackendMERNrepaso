import express from 'express'
import cityController from '../controllers/city.controller.js'
import passport from '../middlewares/passport.js'
import {isAdmin} from '../middlewares/isAdmin.middleware.js'

const router = express.Router();

//Desestructuramos para acortar codigo
const {getCities, createCity, getCityById, updateCity, deleteCity} = cityController

router.get('/', getCities);

router.get('/:id', getCityById)

router.post('/',passport.authenticate('jwt',{session:false}),isAdmin, createCity);

router.put('/:id',passport.authenticate('jwt',{session:false}),isAdmin, updateCity);

router.delete('/:id',passport.authenticate('jwt',{session:false}),isAdmin, deleteCity);

export default router;