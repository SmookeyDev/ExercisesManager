import mongoose, { Schema, Types, Document } from 'mongoose';

export interface TrainingExercise {
    exercise_id: Types.ObjectId;
    reps?: number;
    sets: number;
    weight?: number;
    rest?: number;
}

export interface Training {
    name: string;
    executed_days: number;
    owner: Types.ObjectId;
    exercises: any[]
    lastExecuted?: Date;
}

export interface TrainingDocument extends Training, Document { }

const TrainingSchema: Schema = new Schema(
    {
        id: {
            type: Schema.Types.ObjectId,
            required: false,
        },
        name: {
            type: String,
            required: true,
        },
        executed_days: {
            type: Number,
            required: false,
            default: 0,
        },
        owner: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        exercises: [
            {
                exercise_id: {
                    type: Schema.Types.ObjectId,
                    ref: "Exercise",
                    required: true,
                },
                reps: {
                    type: Number,
                    required: false,
                },
                sets: {
                    type: Number,
                    required: true,
                },
                weight: {
                    type: Number,
                    required: false,
                },
                rest: {
                    type: Number,
                    required: false,
                },
            },
        ],
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