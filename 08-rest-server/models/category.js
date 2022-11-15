import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CategorySchema = Schema({
    name:{
        type: String,
        required: [true, 'Name is mandatory'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
}); 

export default model("Category", CategorySchema);