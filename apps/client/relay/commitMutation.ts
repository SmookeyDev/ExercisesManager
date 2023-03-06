import {
    Environment,
    commitMutation as commitMutationDefault,
} from 'react-relay';

export const commitMutation = (environment: Environment, options: any) => {
    return new Promise((resolve, reject) => {
        commitMutationDefault(environment, {
            ...options,
            onCompleted: (response, errors) => {
                if (errors) {
                    reject(errors);
                }

                resolve(response);
            },
            onError: reject,
        });
    });
}