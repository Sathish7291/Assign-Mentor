import Mentor from '../modules/mentor.js'
import Student from '../modules/student.js'

const assignMultiStudent = async(req,res) =>{
    try {
        const mentor = await Mentor.findOne({id:req.params.mentor_id});
        const students = await Student.find({batch: req.params.batch});
        if(!mentor){
            res.status(200).send({
                message:"Mentor is not valid"
            })
        }
        if(mentor){
            let student_id = students.map((e) => e.id.valueOf());
            await Student.updateMany(
                {batch: req.params.batch},
                {mentor: req.params.id}
            )
            let filter = {id:req.params.mentor_id};
            let update = {students: student_id};
            await Mentor.updateOne(filter, update);
            res.status(200).send({message: "Students add Successfully"})
        }
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

export default {assignMultiStudent}