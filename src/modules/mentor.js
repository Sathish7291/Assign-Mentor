import mongoose from "mongoose";
import validators from "../utils/validators.js";
import { generateUUID } from "../utils/helper.js"

const mentorSchema = new mongoose.Schema({
    id:{
        type:String,
        default:function (){
            return generateUUID()
        }
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate:{
            validator : validators.validateEmail
        }
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student',
        },
    ],
    batch:[
        {type: String}
    ]
},
{
    collection: 'mentor',
})

export default mongoose.model('mentor',mentorSchema);