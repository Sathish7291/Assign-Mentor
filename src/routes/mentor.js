import express from 'express'
import mentorController from '../controller/mentor.js'

const router = express.Router()

router.get('/',mentorController.allMentor)
router.post('/creatementor',mentorController.addMentor)
router.delete('/:id',mentorController.deleteMentor)
router.get('/students/:id',mentorController.mentorStudentList)
router.put('/:id/:batch',mentorController.addBatch)
router.put('/editmentor/:id',mentorController.editMentor)
router.get('/:id',mentorController.getOneMentor)


export default router