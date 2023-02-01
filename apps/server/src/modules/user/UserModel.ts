import mongoose, { Schema, Document, Types } from 'mongoose';

export interface User {
    name: string;
    email: string;
    picture: string;
    provider: string;
    exercises: Types.ObjectId[];
    trainings: Types.ObjectId[];
}

export interface UserDocument extends User, Document { }

const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        picture: {
            type: String,
        },
        provider: {
            type: String,
            default: 'google',
        },
        exercises: {
            type: [Schema.Types.ObjectId],
            default: [],
            ref: 'Exercises',
        },
        trainings: {
            type: [Schema.Types.ObjectId],
            default: [],
            ref: 'Trainings',
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        }
    }
)

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
