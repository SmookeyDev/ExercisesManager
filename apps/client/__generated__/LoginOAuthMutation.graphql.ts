/**
 * @generated SignedSource<<cdbf189221ccb93f772988b279a3faab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type LoginOAuthMutation$variables = {
  token: string;
};
export type LoginOAuthMutation$data = {
  readonly loginWithOAuth: {
    readonly me: {
      readonly email: string | null;
      readonly id: string;
      readonly name: string | null;
      readonly picture: string | null;
    } | null;
  } | null;
};
export type LoginOAuthMutation = {
  response: LoginOAuthMutation$data;
  variables: LoginOAuthMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "token"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "token",
            "variableName": "token"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "LoginWithOAuthPayload",
    "kind": "LinkedField",
    "name": "loginWithOAuth",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "picture",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LoginOAuthMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LoginOAuthMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "27322a2c09c750e5e074b22bf60d97b5",
    "id": null,
    "metadata": {},
    "name": "LoginOAuthMutation",
    "operationKind": "mutation",
    "text": "mutation LoginOAuthMutation(\n  $token: String!\n) {\n  loginWithOAuth(input: {token: $token}) {\n    me {\n      id\n      name\n      email\n      picture\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "de2fe65411f2dc3694a0dd9e9b550f88";

export default node;
