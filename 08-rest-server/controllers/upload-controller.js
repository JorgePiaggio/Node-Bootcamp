import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import fs from 'fs';
import { response } from "express";
import { uploadFileHelper } from '../helpers/file-upload.js'
import User from '../models/user.js'
import Product from '../models/product.js'
import * as dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_URL, 
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET,
    secure: true
});


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

    // find collection for img
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

    // delete prev image
    try {
        if(model.image){
            const pathImg = path.join(__dirname, '../uploads', collection, model.image);
            if(fs.existsSync(pathImg)){
                fs.unlinkSync(pathImg)
            }
        }
    } catch (error) {
        console.log(error);
    }

    // upload new img
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


const showImage = async (req, res = response ) => {

    const { id, collection } = req.params;

    let model;

    // find collection for img
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
        if(model.image){
            const pathImg = path.join(__dirname, '../uploads', collection, model.image);
            if(fs.existsSync(pathImg)){
                return res.sendFile(pathImg);
            }
        }
    } catch (error) {
        console.log(error);
    }

    // if no image
    const pathImg = path.join(__dirname, '../assets/no-image.jpg');
    if(fs.existsSync(pathImg)){
        return res.sendFile(pathImg);
    }
}


const updateImageCloudinary = async (req, res = response ) => {

    const { id, collection } = req.params;
    let model;

    // find collection for img
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
        if(model.image){
            const nameArr = model.image.split('/');
            const name = nameArr[nameArr.lenght - 1];
            const [ public_id ] = name.split('.');
            cloudinary.uploader.destroy(public_id);
        }


        const { tempFilePath } = req.files.file;
        const _tempFilePath = tempFilePath.replace(/\\/g, "/");

        //console.log(cloudinary.config())

        const { secure_url } = await cloudinary.uploader.upload(_tempFilePath);

        model.img = secure_url;

		await model.save(); 

        return res.json(model);

    } catch (error) {
        console.log(error);
        res.status(400).json({
			error
		});
    }
}


export {
    uploadFile,
    updateImage,
    showImage,
    updateImageCloudinary
}