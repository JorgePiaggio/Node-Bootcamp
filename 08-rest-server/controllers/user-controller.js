import { response } from 'express';

const userGet = (req, res = response) => {
    res.json({
        msg: 'get API - controller'
    })
}

const userPut = (req, res) => {
    res.json({
        msg: 'put API - controller'
    })
}

const userPost = (req, res) => {
    res.status(201).json({
        msg: 'post API - controller'
    })
}

const userPatch =  (req, res) => {
    res.json({
        msg: 'patch API - controller'
    })
}

const userDelete = (req, res) => {
    res.json({
        msg: 'delete API - controller'
    })
}



export { 
    userGet, 
    userPost, 
    userPut, 
    userDelete, 
    userPatch 
}