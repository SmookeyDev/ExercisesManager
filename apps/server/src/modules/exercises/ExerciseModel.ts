import mongoose, { Schema, Types, Document } from 'mongoose';

export interface Exercise {
    name: string;
    muscle_group: string;
    description?: string;
    video_url?: string;
    owner_id: Types.ObjectId;
}

export interface ExerciseDocument extends Exercise, Document { }

const ExerciseSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        muscle_group: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        video_url: {
            type: String,
            required: false,
        },
        owner_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        }
    }
);

export const ExerciseModel = mongoose.model<ExerciseDocument>('Exercise', ExerciseSchema);