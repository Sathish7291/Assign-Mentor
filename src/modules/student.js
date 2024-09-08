import mongoose from './index.js';
import validators from '../utils/validators.js';
import { generateUUID } from '../utils/helper.js';

const studentSchema = new mongoose.Schema(
    {
        id:{
            type:String,
            default:function (){
                return generateUUID()
            }
        },
        name:{
            type: String,
            required: [true, "Name is required"],
        },
        email:{
            type: String,
            requried: [true, "Email is required"],
            validate: {
                validator: validators.validateEmail,
            message: props => `${props.value} is not a valid email`,
            },
        },
        mentor: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "mentor",
        },
        batch: {
            type: String,
            required: [true, "Batch is required"],
        },
        previous_mentor: [{ type: mongoose.Schema.Types.ObjectId, ref:"mentor"}],
    },
    {
        collection: "student",
        versionKey: false,
    }
);

export default mongoose.model("student",studentSchema)