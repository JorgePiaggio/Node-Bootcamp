import express, {Application} from 'express';
import cors from 'cors';

import userRoutes from '../routes/user-routes';
import { dbConnection } from "../db/config";

export class Server {
    
    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.connectDB();
        this.middlewares();
        this.routes();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port: ' + this.port);
        })
    }

    async connectDB() {
		await dbConnection();
	}

    middlewares(){
        // cors
        this.app.use(cors());

        // parse body
        this.app.use(express.json());

        // public folder for static content
        this.app.use(express.static('public'));
    }


    routes(){
        this.app.use(this.apiPaths.users, userRoutes);
    }

}