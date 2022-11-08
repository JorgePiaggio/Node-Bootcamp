import mongoose from "mongoose";
const { Schema, model } = mongoose;

const RoleSchema = Schema({
    rol:{
        type: String,
        required: [true, 'Role is mandatory']
    }
}); 

export default model("Role", RoleSchema);