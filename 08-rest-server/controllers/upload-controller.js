import { response } from "express";
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const uploadFile = (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    const { file } = req.files;

    const uploadPath = path.join(__dirname, '../uploads/', file.name);

    file.mv(uploadPath, function(err) {
        if (err) {
            return res.status(500).json({err});
        }

        res.json({msg: 'File uploaded to ' + uploadPath });
    });
}





export {
    uploadFile
}