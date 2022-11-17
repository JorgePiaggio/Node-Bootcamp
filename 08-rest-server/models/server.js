import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { router } from '../routes/user-routes.js';
import { routerAuth } from '../routes/auth-routes.js';
import { routerCategory } from '../routes/category-routes.js';
import { routerProduct } from '../routes/product-routes.js';
import { routerSearch } from '../routes/search-routes.js';
import { routerUpload } from '../routes/upload-routes.js';
import { dbConnection } from '../db/config.js';

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth:       '/api/auth',
            user:       '/api/user',
            category:   '/api/category',
            product:    '/api/product',
            search:     '/api/search',
            upload:     '/api/upload',
        }

        // database
        this.connectDB();

        // middlewares
        this.middlewares();

        // rutas 
        this.routes();
    }

    routes() {
        this.app.use(this.paths.auth, routerAuth);
        this.app.use(this.paths.user, router);
        this.app.use(this.paths.category, routerCategory);
        this.app.use(this.paths.product, routerProduct);
        this.app.use(this.paths.search, routerSearch);
        this.app.use(this.paths.upload, routerUpload);
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        // cors
        this.app.use(cors())
        // lectura y parseo del body en post put delete
        this.app.use(express.json());
        // directorio 
        this.app.use(express.static('public'));
        // file upload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));

    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Listening at http://localhost:${ this.port }`)
        });
    }

}





export default Server