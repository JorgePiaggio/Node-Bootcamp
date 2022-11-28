import mongoose, { ConnectOptions } from 'mongoose';

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODB as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            // not supported
            // useCreateIndex: true,
            // useFindAndModify: false
        } as ConnectOptions);

        console.log('Database connection success!!');

    } catch (error) {
        console.log(error);
        throw new Error('Error while connecting to database');
    }
}


export { dbConnection }