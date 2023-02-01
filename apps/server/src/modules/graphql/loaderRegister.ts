export interface DataLoaders {
    UserLoader?: ReturnType<typeof import('../user/UserLoader').getLoader>;
    ExerciseLoader?: ReturnType<typeof import('../exercises/ExerciseLoader').getLoader>;
    TrainingLoader?: ReturnType<typeof import('../trainings/TrainingLoader').getLoader>;
}

const loaders: {
    [Name in keyof DataLoaders]: () => DataLoaders[Name];
} = {};

const registerLoader = <Name extends keyof DataLoaders>(name: Name, loader: typeof loaders[Name]) => {
    loaders[name] = loader;
};

const getAllLoaders = (): DataLoaders => Object.entries(loaders).reduce((acc, [loaderKey, loaderFn]) => ({ ...acc, [loaderKey]: loaderFn() }), {} as DataLoaders);

export { registerLoader, getAllLoaders };