import StudentModel from '../modules/student.js'
import 'dotenv/config'

const getallStudent = async(req,res) =>{
    try {
        let student = await StudentModel.find({},{_id:0})
        res.status(200).send({
            message:"Data Fetch Successfully",
            student
        })
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

const getStudent = async (req,res) =>{
    try {
        let {id} = req.params
        let student = await StudentModel.findOne({id:id},{_id:0})
        res.status(200).send({
            message:"Data Fetch Successfully",
            student
        })
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

const addStudent = async(req,res) => {
    try {
        const student = await StudentModel.findOne({email:req.body.email})

        if(!student){
            let newstudent = await StudentModel.create(req.body)
            res.status(200).send({
                message: "student Added Successfully",
            })
        }else{
            res.status(400).send({
                message:`student with ${req.body.email} already exists`
            })
        }
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}


const deleteStudent = async(req,res) =>{
    try {
        let {id} = req.params
        let student = await StudentModel.deleteOne({id:id})
        if(student.deletedCount)
            res.status(200).send({message:"Student Deleted Successfully"})
        else
            res.status(400).send({message:"Invalid Id"})
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

const editStudent = async(req,res) =>{
    try {
        let {id} = req.params
        let student = await StudentModel.findOne({id:id})
        if(student)
        {
            const students = await StudentModel.updateOne({id:id},{$set:req.body})
            res.status(200).send({
                message:"Student Edited Successfully"
            })
        }else{
            res.status(400).send({
                message: "Invalid Student Id"
            })
        }
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

export default {getallStudent,getStudent,editStudent,addStudent,deleteStudent}