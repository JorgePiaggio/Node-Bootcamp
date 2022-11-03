import { request, response } from 'express';

const userGet = (req = request, res = response) => {

    const { query, name = 'No name', apikey, page = 0, limit = 10 } = req.query;

    res.json({
        msg: 'get API - controller',
        query,
        name,
        apikey,
        page,
        limit
    })
}

const userPut = (req = request, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - controller',
        id
    })
}

const userPost = (req = request, res = response) => {
    
    const {name, age} = req.body;

    res.status(201).json({
        msg: 'post API - controller',
        name, 
        age
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

const userDelete = (req = request, res = response) => {

    const {name, age} = req.body;

    res.json({
        msg: 'delete API - controller',
        name, 
        age
    })
}



export { 
    userGet, 
    userPost, 
    userPut, 
    userDelete, 
    userPatch 
}