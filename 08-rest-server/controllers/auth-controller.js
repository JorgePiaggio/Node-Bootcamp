import { json, request, response } from 'express';
import User from '../models/user.js';
import bcrypt from "bcryptjs";
import { generateJWT } from '../helpers/jwt.js'
import { googleVerify } from '../helpers/google-verify.js';

const login = async (req = request, res = response) => {

    const { mail, password } = req.body;

    try {
        // check email exists
        const user = await User.findOne({mail});
        if(!user){
            return res.status(400).json({
                msg: 'Invalid User/Pass'
            })
        }

        // check user is active
        if(!user.state){
            return res.status(400).json({
                msg: 'Invalid User/Pass'
            })
        }

        // check user is active
        const validPass = bcrypt.compareSync(password, user.password);

        if(!validPass){
            return res.status(400).json({
                msg: 'Invalid User/Password'
            })
        }

        // generate token
        const token = await generateJWT(user.id);


        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Oops... Something went wrong'
        })
    }

}

const googleSignIn = async (req = request, res = response) => {
    const { id_token } = req.body;

    try {
        
        const { name, picture, email } = await googleVerify(id_token);

        res.json({
            msg: 'Google sign in Success',
            id_token
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Unable to verify token'
        })
    }

}


export {
    login,
    googleSignIn
}