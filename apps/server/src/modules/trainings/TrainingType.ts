import { connectionDefinitions } from '@entria/graphql-mongo-helpers';
import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLFloat, GraphQLID } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { registerTypeLoader, nodeInterface } from '../graphql/typeRegister';
import { Training, TrainingDocument } from './TrainingModel';
import { load } from './TrainingLoader';

import { TrainingExercise } from './TrainingModel';
import { ExerciseType } from '../exercises/ExerciseType';
import { ExerciseModel } from '../exercises/ExerciseModel';

const TrainingExerciseType = new GraphQLObjectType<TrainingExercise>({
    name: 'TrainingExercise',
    fields: () => ({
        exercise_id: {
            type: GraphQLString,
            resolve: exercise => exercise.exercise_id,
        },
        reps: {
            type: GraphQLInt,
            resolve: exercise => exercise.reps,
        },
        sets: {
            type: GraphQLInt,
            resolve: exercise => exercise.sets,
        },
        weight: {
            type: GraphQLFloat,
            resolve: exercise => exercise.weight,
        },
        rest: {
            type: GraphQLInt,
            resolve: exercise => exercise.rest,
        },
        details: {
            type: ExerciseType,
            resolve: (exercise) => ExerciseModel.findOne({ _id: exercise.exercise_id })
        }
    }),
})

export const TrainingType = new GraphQLObjectType<TrainingDocument>({
    name: 'Training',
    fields: () => ({
        id: globalIdField('Training'),
        _id: {
            type: GraphQLID,
            resolve: training => training._id,
        },
        name: {
            type: GraphQLString,
            resolve: training => training.name,
        },
        executed_days: {
            type: GraphQLInt,
            resolve: training => training.executed_days,
        },
        owner: {
            type: GraphQLString,
            resolve: training => training.owner,
        },
        exercises: {
            type: new GraphQLList(TrainingExerciseType),
            resolve: (training) => training.exercises
        }
    }),
    interfaces: () => [nodeInterface],
});

export const TrainingConnection = connectionDefinitions({
    name: 'TrainingConnection',
    nodeType: TrainingType,
});

registerTypeLoader(TrainingType, load);