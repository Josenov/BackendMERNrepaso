import express from 'express'
import userRouter from './user.router.js'
import cityRouter from './city.router.js'
import travelCompanyRouter from './travelCompany.router.js'
import authRouter from './auth.router.js'


const router = express.Router();

router.get('/', (req, res)=>{
    res.send("Hola mundo!")
});

//use responde a peticiones de cualquier tipo
router.use('/users', userRouter);
router.use('/cities', cityRouter);

router.use('/travelCompanies', travelCompanyRouter);

router.use('/auth', authRouter);




export default router;