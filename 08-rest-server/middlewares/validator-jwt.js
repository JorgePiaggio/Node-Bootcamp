import { request, response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';


export const validateJWT = async ( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No token provided'
        })
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById(uid);

        // check user state is true
        if(!user){
            return res.status(401).json({
                msg: 'Invalid token - user does not exist'
            })
        }

        // check user state is true
        if(!user.state){
            return res.status(401).json({
                msg: 'Invalid token - user state: false'
            })
        }

        req.user = user;
        
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        })
    }
}
