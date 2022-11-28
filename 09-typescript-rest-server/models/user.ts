import mongoose from "mongoose";
const { Schema, model } = mongoose;

interface userType {
	name: string;
	mail: string;
	password: string;
	status: boolean;
}

const userSchema = new Schema<userType>({
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
    status: {
        type: Boolean,
        default: true
    }
});


userSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

export default model("Users", userSchema);