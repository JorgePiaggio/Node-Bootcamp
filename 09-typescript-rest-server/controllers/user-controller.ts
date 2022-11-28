import bcrypt from 'bcryptjs';
import { request, response } from 'express';
import User from '../models/user.js';

const getUser = async (req = request, res = response) => {

    const { id } = req.params;
	const user = await User.findById(id);

	res.json({
		user
	});
}

const getUsers = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;

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

const postUser = async (req = request, res = response) => {

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

const updateUser = async (req = request, res = response) => {

    const { id } = req.params;
    const {_id, password, google, mail, ...rest } = req.body;

    if(password){
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync (password, salt);
    }

    const userDB = await User.findByIdAndUpdate(id, rest, { new: true });

    if(!userDB){
        res.status(404).json({
            msg: 'User not found'
        });
    }

    res.json({
        userDB
    })
}

const deleteUser = async (req = request, res = response) => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, {state: false}, { new: true });

    if(!user){
        res.status(404).json({
            msg: 'User not found'
        });
    }

    res.json({
        user
    });
}


export { 
    getUsers, 
    getUser, 
    postUser, 
    updateUser, 
    deleteUser
}