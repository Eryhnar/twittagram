//general seeder that imports all the seeders and runs them
import { dbConnection } from "../db.js";
//import "dotenv/config";
//import { app } from "./app.js";
import mongoose from 'mongoose';
import userSeeder from './user-seeder.js';
//import postSeeder from './post-seeder.js';
//import commentSeeder from './comment-seeder.js';

/*
const seed = async () => {
    await userSeeder();
    //await postSeeder();
    //await commentSeeder();
}

seed();
*/

const seed = async () => {
    try {
        await dbConnection();
        console.log("Database connected.");
        await userSeeder();
        //await postSeeder();
        //await commentSeeder();
    } catch (error) {
        console.log("Database connection failed.");
        console.error(error.message);
    } finally {
        // Close the database connection
        await mongoose.connection.close();
        console.log("Database connection closed.");
    }
}

seed();