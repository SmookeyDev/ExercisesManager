import {
    Environment,
    Network,
    RecordSource,
    Store,
    FetchFunction,
    RequestParameters,
    Variables
} from 'relay-runtime';

import { fetchGraphQL } from './fetchGraphQL';

const fetchRelay: FetchFunction = async (params: RequestParameters, variables: Variables) =>
    fetchGraphQL(params.text as string, variables);

export const RelayEnvironment = new Environment({
    network: Network.create(fetchRelay),
    store: new Store(new RecordSource()),
});