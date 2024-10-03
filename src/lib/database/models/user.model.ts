import { Schema, model, models } from "mongoose";

// Define the User interface
export interface IUser extends Document {
    email: string;
    username: string;
    photo?: string;
    firstName?: string;
    lastName?: string;
    planId: number;
    creditBalance: number;
    password: string;  // Added password field
}

// Create the User schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    photo: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    planId: {
        type: Number,
        default: 1,
    },
    creditBalance: {
        type: Number,
        default: 10,
    },
    password: {
        type: String,  // Added password field
        required: true,  // Make this required if necessary
    },
});

// Create the User model
const User = models?.User || model<IUser>("User", UserSchema);

export default User;
