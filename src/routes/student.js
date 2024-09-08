import express from 'express'
import studentController from '../controller/student.js'

const router = express.Router()

router.get('/',studentController.getallStudent)
router.get('/:id',studentController.getStudent)
router.post('/createstudent',studentController.addStudent)
router.delete('/:id',studentController.deleteStudent)
router.put('/editstudent/:id',studentController.editStudent)

export default router