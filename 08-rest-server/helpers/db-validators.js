import Category from '../models/category.js';
import Role from '../models/role.js'
import User from '../models/user.js';

const isRoleValid = async(role = '') => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists){
        throw new Error(`Role ${role} does not exist in Database`);
    }
}

const emailExists = async( mail ) => {
    const exists = await User.findOne({ mail });

    if( exists ){
        throw new Error(`Mail ${mail} already exists in Database`);
    }
}

const userByIdExists = async( id ) => {
    const exists = await User.findById(id);

    if( !exists ){
        throw new Error(`Id ${id} does not exist in Database`);
    }
}

const categoryByIdExists = async( id ) => {
    const exists = await Category.findById(id);

    if( !exists ){
        throw new Error(`Id ${id} does not exist in Database`);
    }
}

const productByIdExists = async( id ) => {
    const exists = await Product.findById(id);

    if( !exists ){
        throw new Error(`Id ${id} does not exist in Database`);
    }
}

const allowedCollections = (collection = '', collectionsAllowed = []) => {
    const included = collectionsAllowed.includes(collection);

    if(!included){
        throw new Error(`${collection} is not allowed. Allowed: ${collectionsAllowed}`);
    }

    return true;
}

export {
    isRoleValid,
    emailExists,
    userByIdExists,
    categoryByIdExists,
    productByIdExists,
    allowedCollections
}