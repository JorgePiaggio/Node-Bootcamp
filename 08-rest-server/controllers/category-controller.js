import { response } from "express";
import Category from '../models/category.js';

const createCategory = async (req, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({name});

    if(categoryDB){
        return res.status(400).json({
            msg:  `Category ${categoryDB.name} already exists`
        });
    }

    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data);
    await category.save();

    res.status(201).json(category);
}

const getCategories = async (req, res = response ) => {

    const { limit = 5, from = 0 } = req.query;

    // join awaits 
    const [total, categories] = await Promise.all([
        Category.countDocuments({status: true}),
        Category.find({state: true})
            .populate('user', 'name')
            .limit(Number(limit))
            .skip(Number(from))
    ])

    res.json({
        total,
        categories
    });
}

const getCategory = async (req, res = response ) => {

    const { id } = req.params;

    const category = await Category.findById(id).populate('user', 'name')

    res.json({
        category
    });
}

const updateCategory = async (req, res = response) => {

    const { id } = req.params;
    const { status, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, {new: true});

    res.json(category);

}

const deleteCategory = async (req, res = response) => {

    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, {status: false}, {new: true});

    res.json(category);

}


export {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}