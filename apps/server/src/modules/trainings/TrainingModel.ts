import mongoose, { Schema, Types, Document } from 'mongoose';

export interface Training {
    name: string;
    description: string;
    executed_days: number;
    owner_id: Types.ObjectId;
    exercises: Types.ObjectId[];
    lastExecuted: Date;
}

export interface TrainingDocument extends Training, Document { }

const TrainingSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        executed_days: {
            type: Number,
            required: true,
        },
        owner_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        exercises: {
            type: [Schema.Types.ObjectId],
            default: [],
            ref: 'Exercise',
        },
        lastExecuted: {
            type: Date,
            default: null,
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        }
    }
);

export const TrainingModel = mongoose.model<TrainingDocument>('Training', TrainingSchema);