import express from 'express'
import assignController from '../controller/assign.js'

const router = express.Router()

router.post('/student/:batch/mentor/:mentor_id',assignController.assignMultiStudent);

export default router;
