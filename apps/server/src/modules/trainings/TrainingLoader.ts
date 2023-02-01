import { createLoader } from "@entria/graphql-mongo-helpers";
import { registerLoader } from "../graphql/loaderRegister";
import { TrainingModel } from "./TrainingModel";

const Loader = createLoader({
    model: TrainingModel,
    loaderName: "TrainingLoader"
})

export default Loader;
export const { Wrapper: Training, getLoader, clearCache, load, loadAll } = Loader;

registerLoader('TrainingLoader', getLoader);;