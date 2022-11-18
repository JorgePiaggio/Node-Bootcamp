import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const uploadFileHelper = (files , validExtensions = ['jpg', 'png','jpeg','gif'], folder = '') => {


    return new Promise((reject, resolve) => { 

        const { file } = files;
        const  renameFile = file.name.split('.');
        const extension = renameFile[renameFile.length -1];

        // validate extension
        const _validExtensions = validExtensions;
        if(!_validExtensions.includes(extension)){
            return reject(`${extension} files are not allowed. Allowed: ${_validExtensions}`);
        }

        const tempName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

        file.mv(uploadPath, (err) => {
            if (err) {
                resolve(err);
            }

            resolve(tempName);
        });
    })
}




export {
    uploadFileHelper
}