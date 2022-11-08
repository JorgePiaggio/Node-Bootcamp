import mongoose from 'mongoose';

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            // not supported
            // useCreateIndex: true,
            // useFindAndModify: false
        });

        console.log('Database connection success!!');

    } catch (error) {
        console.log(error);
        throw new Error('Error while connecting to database');
    }
}


export { dbConnection }