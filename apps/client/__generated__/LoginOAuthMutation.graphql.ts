/**
 * @generated SignedSource<<a1cbe7884e91fa61fb6ca47f07a3d434>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type LoginOAuthMutation$variables = {
  id_token: string;
};
export type LoginOAuthMutation$data = {
  readonly loginWithOAuth: {
    readonly token: string;
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
    "name": "id_token"
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
            "name": "id_token",
            "variableName": "id_token"
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
        "kind": "ScalarField",
        "name": "token",
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
    "cacheID": "bf1b99ea9746775ef63232cc027339f6",
    "id": null,
    "metadata": {},
    "name": "LoginOAuthMutation",
    "operationKind": "mutation",
    "text": "mutation LoginOAuthMutation(\n  $id_token: String!\n) {\n  loginWithOAuth(input: {id_token: $id_token}) {\n    token\n  }\n}\n"
  }
};
})();

(node as any).hash = "19c3855466ff83491de72d4eb47a8a63";

export default node;
