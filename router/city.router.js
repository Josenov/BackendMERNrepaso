import express from 'express'
import cityController from '../controllers/city.controller.js'

const router = express.Router();

//Desestructuramos para acortar codigo
const {getCities, createCity, getCityById} = cityController

router.get('/', getCities);

router.get('/:id', getCityById)

router.post('/', createCity);

export default router;