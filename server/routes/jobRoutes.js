import express from 'express'
import { getJobByID, getJobs } from '../controllers/jobController.js'
import { applyForJob } from '../controllers/userController.js'

const router = express.Router()

//Route to get all jobs data

router.get('/', getJobs)


//Route to get a single job by ID

router.get('/:id', getJobByID)

router.post('/apply', applyForJob)

export default router