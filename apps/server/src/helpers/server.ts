import Koa, { Request, Response } from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { graphqlHTTP, OptionsData } from 'koa-graphql';
import cors from '@koa/cors';

import { schema } from '../schema';
import { getUser } from '../utils/getUser';
import { getContext } from '../utils/getContext';

const app = new Koa();
const router = new Router();

const graphQlSettingsPerReq = async (req: Request, res: Response): Promise<OptionsData> => {
  const user = await getUser(req.headers.authorization || "");

  return {
    schema,
    pretty: true,
    context: user ? getContext(user) : {},
  }
}

const graphQlServer = graphqlHTTP(graphQlSettingsPerReq);
router.all('/graphql', graphQlServer);

app.use(cors());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

export default app;