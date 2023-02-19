import mongoose, { Schema, Document, Types } from 'mongoose';

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
    provider: string;
}

export interface UserDocument extends User, Document { }

const UserSchema: Schema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
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
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        }
    }
)

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
