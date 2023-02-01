/**
 * @generated SignedSource<<6c3fa82b99b138514de32c9e06231715>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type MeQuery$variables = {};
export type MeQuery$data = {
  readonly me: {
    readonly email: string | null;
    readonly exercises: {
      readonly description: string | null;
      readonly muscle_group: string | null;
      readonly name: string | null;
      readonly reps: string | null;
      readonly series: string | null;
      readonly video_url: string | null;
    } | null;
    readonly name: string | null;
    readonly picture: string | null;
    readonly trainings: {
      readonly description: string | null;
      readonly executed_days: string | null;
      readonly exercises: {
        readonly description: string | null;
        readonly muscle_group: string | null;
        readonly name: string | null;
        readonly reps: string | null;
        readonly series: string | null;
        readonly video_url: string | null;
      } | null;
      readonly name: string | null;
    } | null;
  } | null;
};
export type MeQuery = {
  response: MeQuery$data;
  variables: MeQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "picture",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "muscle_group",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "video_url",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "series",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reps",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "Exercise",
  "kind": "LinkedField",
  "name": "exercises",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    (v3/*: any*/),
    (v4/*: any*/),
    (v5/*: any*/),
    (v6/*: any*/),
    (v7/*: any*/)
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "executed_days",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "Exercise",
  "kind": "LinkedField",
  "name": "exercises",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    (v3/*: any*/),
    (v4/*: any*/),
    (v5/*: any*/),
    (v6/*: any*/),
    (v7/*: any*/),
    (v10/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MeQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v8/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Training",
            "kind": "LinkedField",
            "name": "trainings",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v4/*: any*/),
              (v9/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MeQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v11/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Training",
            "kind": "LinkedField",
            "name": "trainings",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v4/*: any*/),
              (v9/*: any*/),
              (v11/*: any*/),
              (v10/*: any*/)
            ],
            "storageKey": null
          },
          (v10/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "95eeb671e7234128dc39e8247b363e56",
    "id": null,
    "metadata": {},
    "name": "MeQuery",
    "operationKind": "query",
    "text": "query MeQuery {\n  me {\n    name\n    email\n    picture\n    exercises {\n      name\n      muscle_group\n      description\n      video_url\n      series\n      reps\n      id\n    }\n    trainings {\n      name\n      description\n      executed_days\n      exercises {\n        name\n        muscle_group\n        description\n        video_url\n        series\n        reps\n        id\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "bbf870ccd32172add1b30ce5ce509f2c";

export default node;
