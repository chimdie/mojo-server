import mongoose from "mongoose";

export default interface ModelI{
    schema: mongoose.Schema<any>
    model: mongoose.Model<any, {}>
}