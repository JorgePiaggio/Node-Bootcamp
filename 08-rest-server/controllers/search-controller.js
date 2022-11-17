import { response } from "express";
import mongoose from 'mongoose';
import User from '../models/user.js'
import Category from '../models/category.js'
import Product from '../models/product.js'

const allowedCollections = [
    'users',
    'categories',
    'products',
    'roles'
]

const searchUsers = async (term = '', res = response) => {

    const isMongoId = mongoose.Types.ObjectId.isValid(term);

    if(isMongoId){
        const user = await User.findById(term);
        res.json({
            results: (user) ? [user] : []
        });
    }

    const regex = new RegExp(term, 'i')
;
    const users = await User.find({ 
        $or: [{name: regex}, {mail: regex}],
        $and: [{status: true}]
    });

    res.json({
        results: users
    })

}

const searchCategories = async (term = '', res = response) => {

    const isMongoId = mongoose.Types.ObjectId.isValid(term);

    if(isMongoId){
        const category = await Category.findById(term);
        res.json({
            results: (category) ? [category] : []
        });
    }

    const regex = new RegExp(term, 'i')
;
    const categories = await Category.find({ 
        $or: [{name: regex}],
        $and: [{status: true}]
    });

    res.json({
        results: categories
    })

}

const searchProducts = async (term = '', res = response) => {

    const isMongoId = mongoose.Types.ObjectId.isValid(term);

    if(isMongoId){
        const product = await Product.findById(term).populate('category', 'name');
        res.json({
            results: (product) ? [product] : []
        });
    }

    const regex = new RegExp(term, 'i')
;
    const products = await Product.find({ 
        $or: [{name: regex}],
        $and: [{status: true}]
    }).populate('category', 'name');

    res.json({
        results: products
    })

}

const search = (req ,res = response) => {

    const { collection, term } = req.params;

    if (!allowedCollections.includes(collection)){
        return res.status(400).json({
            msg: `Allowed collections are: ${allowedCollections}`
        })
    }

    switch(collection){
        case 'users':
            searchUsers(term, res);
            break;
        case 'categories':
            searchCategories(term, res);
            break;
        case 'products':
            searchProducts(term, res);
            break;
        case 'roles':
            break;
        default:
            res.status(500).json({
                msg: 'Error while searching'
            })
    }



}



export {
    search
}