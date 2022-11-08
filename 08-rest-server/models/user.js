import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is mandatory']
    },
    mail: {
        type: String,
        required: [true, 'Mail is mandatory'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is mandatory']
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


userSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}


export default model("Users", userSchema);