import { request, response } from 'express';
import User from '../models/user.js';
import bcrypt from "bcryptjs";

const userGet = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;

    // const total = await User.countDocuments({state: true});

    // const users = await User.find({state: true})
    // .limit(Number(limit))
    // .skip(Number(from));

    // join awaits 
    const [total, users] = await Promise.all([
        User.countDocuments({state: true}),
        User.find({state: true})
            .limit(Number(limit))
            .skip(Number(from))
    ])

    res.json({
        total,
        users
    })
}

const userPost = async (req = request, res = response) => {

    const {name, mail, password, role} = req.body;
    const user = new User({name, mail, password, role});

    // encriptar pass
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync (password, salt);

    await user.save();

    res.json({
        user
    })
}

const userPut = async (req = request, res = response) => {

    const { id } = req.params;
    const {_id, password, google, mail, ...rest } = req.body;

    if(password){
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync (password, salt);
    }

    const userDB = await User.findByIdAndUpdate(id, rest, { new: true });

    res.json({
        userDB
    })
}

const userPatch =  (req = request, res = response) => {

    const {name, age} = req.body;

    res.json({
        msg: 'patch API - controller',
        name, 
        age
    })
}

const userDelete = async (req = request, res = response) => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, {state: false}, { new: true });
    const authUser = req.user;
    
    res.json({
        user,
        authUser
    });
}


export { 
    userGet, 
    userPost, 
    userPut, 
    userDelete, 
    userPatch 
}