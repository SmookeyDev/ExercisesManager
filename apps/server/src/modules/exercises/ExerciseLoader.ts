import { createLoader } from "@entria/graphql-mongo-helpers";
import { registerLoader } from "../graphql/loaderRegister";
import { ExerciseModel } from "./ExerciseModel";

const Loader = createLoader({
    model: ExerciseModel,
    loaderName: "ExerciseLoader"
})

export default Loader;
export const { Wrapper: Exercise, getLoader, clearCache, load, loadAll } = Loader;

registerLoader('ExerciseLoader', getLoader);