import express from 'express';
import cors from 'cors';
import { router } from '../routes/user-routes.js'
import { dbConnection } from '../db/config.js'

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user';

        // database
        this.connectDB();

        // middlewares
        this.middlewares();

        // rutas 
        this.routes();
    }

    routes() {
        this.app.use(this.userPath, router)
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
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Listening at http://localhost:${ this.port }`)
        });
    }

}





export default Server