import { printSchema } from 'graphql/utilities';
import { promises } from 'fs';
import path from 'path';

import { schema } from '../src/schema';

(async () => {
    const schemaPath = path.join(__dirname, '../graphql/schema.graphql');
    const schemaString = printSchema(schema);

    await promises.writeFile(schemaPath, schemaString);
})();