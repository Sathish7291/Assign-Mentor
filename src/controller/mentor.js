import MentorModel from "../modules/mentor.js";
import StudentModel from "../modules/student.js";
import config from "../utils/config.js";

const allMentor = async (req,res) =>{
    try {
        const mentor = await MentorModel.find();
        res.status(200).send({
            message: "Mentors Data Fetched Successfully",
            mentor,
        })
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
};

const addMentor = async (req,res) =>{
    try {
        const user = await MentorModel.findOne({ email: req.body.email });

        if(!user){
            let newMentor = await MentorModel.create(req.body);
            res.status(200).send({
                message: "Mentor Added Successfully",
                newMentor
            });
        }
        else {
            res.status(400).send({
                message: `Mentor with ${req.body.email} already exists`,
            });
        }
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

const deleteMentor = async (req,res) => {
    try {
        let {id} = req.params
        let data = await MentorModel.deleteOne({id:id})
        if(data.deletedCount)
            res.status(200).send({message: "Mentor Deleted Successfully"})
        else
            res.status(400).send({message: "Invalid Id"})
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}


const mentorStudentList = async (req,res) =>{
    try {
        let {id} = req.params
        let mentor = await MentorModel.findOne({id:id},{_id:0})
        const students = await StudentModel.find({mentor: req.params.id});
        if(mentor){
            res.status(200).send({
                message: "Students List Fetched Successfully",
                mentor,
                students,
            });
        }
        else{
            res.status(400).send({
                message: "Mentor Id Not Valid"
            })
        }
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

const addBatch = async(req,res) =>{
    try {
        const id = req.params.id;
        const batch = req.params.batch;
        const findBatch = await MentorModel.findOne({batch:{$all:[batch]}})
        if(!findBatch){
            res.status(200).send({
                message:"updated",
            });
        }else{
            res.status(400).send({
                message:`Batch with ${batch} already exists`
            })
        }
        await MentorModel.updateOne({id : req.params.id},{$push:{batch:batch}})
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

const editMentor = async(req,res) =>{
    try {
        let {id} = req.params
        let mentor = await MentorModel.findOne({id:id},{_id:0}) 
        if(mentor){
            await MentorModel.updateOne({id:req.params.id},{$set:req.body})
            res.status(200).send({
                message:"update mentor"
            })
        }
        else{
            res.status(400).send({
                message:"Invalid mentor id"
            })
        }
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

const getOneMentor = async (req,res) =>{
    try {
        let {id} = req.params
        let mentor = await MentorModel.findOne({id:id},{_id:0})
        res.status(200).send({
            message:"Data Fetch Successfully",
            mentor
        })
    } catch (error) {
        console.log("Error in /getOneMentor",error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}


export default {
    allMentor,
    addMentor,
    deleteMentor,
    mentorStudentList,
    addBatch,
    editMentor,
    getOneMentor
}