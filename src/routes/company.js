import express from 'express'
import company from '../controllers/company.js'

const router = express.Router();
router.get('/list',company.getAllCompanies)
export default router;