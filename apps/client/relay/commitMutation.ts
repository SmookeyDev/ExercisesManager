import {
    Environment,
    commitMutation as commitMutationDefault,
} from 'react-relay';

export const commitMutation = (environment: Environment, options: any) => {
    const { onCompleted, onError, ...rest} = options;

    return new Promise((resolve, reject) => {
        commitMutationDefault(environment, {
            ...rest,
            onCompleted: onCompleted || ((response, errors) => {
                if (errors) {
                    reject(errors);
                }

                resolve(response);
            }),
            onError: onError || reject,
        });
    });
}