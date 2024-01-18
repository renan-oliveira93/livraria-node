import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_DB_URI);

let db = mongoose.connection;

export default db;