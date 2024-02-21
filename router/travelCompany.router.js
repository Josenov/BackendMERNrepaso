import express from 'express'
import travelCompanyController from '../controllers/travelCompany.js'

const router = express.Router();

router.get('/', travelCompanyController.getTravelCompanies );
router.post('/', travelCompanyController.createTravelCompanies);


export default router;