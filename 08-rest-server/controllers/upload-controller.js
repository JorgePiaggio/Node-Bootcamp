import { response } from "express";
import { uploadFileHelper } from '../helpers/file-upload.js'
import User from '../models/user.js'
import Product from '../models/product.js'

const uploadFile = async (req, res = response) => {
    
    try {
        const filePath = await uploadFileHelper(req.files, undefined, 'img');
        //const filePath = await uploadFileHelper(req.files, ['txt', 'md'], 'text');
            
        res.json({
            path: filePath
        });

    } catch (error) {
        res.status(400).json({error});
    }

}

const updateImage = async (req, res = response ) => {

    const { id, collection } = req.params;

    let model;

    switch(collection){
        case 'users':
            model = await User.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: `User with id ${id} does not exist`
                });
            }
        break;
        case 'products':
            model = await Product.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: `Product with id ${id} does not exist`
                });
            }
            break;
        default:
            return res.status(500).json({msg: 'Error, please contact support'})
    }

    try {
        const name = await uploadFileHelper(req.files, undefined, collection);
        model.image = name;
        await model.save();
    } catch (error) {        
        // check why saves img but returns error
        model.image = error;
        await model.save();
    } finally {
        res.json(model);
    }

}







export {
    uploadFile,
    updateImage
}