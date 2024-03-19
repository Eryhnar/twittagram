import "dotenv/config";
import mongoose from "mongoose";

//const MONGO_URI = `mongodb://${process.env.DB_MONGO_USER}:${process.env.DB_MONGO_PASSWORD}@${process.env.DB_MONGO_HOST}:${process.env.DB_MONGO_PORT}/${process.env.DB_MONGO_DATABASE}?authSource=admin`;
// const MONGO_URI = process.env.DB_MONGO_URI;
const MONGO_URI = `mongodb+srv://bananana:QFRdUtYXY7UiEH3f@twittagram.csa0nvd.mongodb.net/`

export const dbConnection = () => {
    return mongoose.connect(`${MONGO_URI}`, {} );
}