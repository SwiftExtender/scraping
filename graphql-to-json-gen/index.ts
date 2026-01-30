import {
    IntrospectionQuery,
    buildSchema,
    GraphQLSchema,
    introspectionFromSchema
} from 'graphql';
import { schema } from './schem';

import { fromIntrospectionQuery } from 'graphql-2-json-schema';


const parsed_schema: GraphQLSchema = buildSchema(schema);


const options = {
  // Whether or not to ignore GraphQL internals that are probably not relevant
  // to documentation generation.
  // Defaults to `true`
  ignoreInternals: true,
  // Whether or not to properly represent GraphQL Lists with Nullable elements
  // as type "array" with items being an "anyOf" that includes the possible
  // type and a "null" type.
  // Defaults to `false` for backwards compatibility, but in future versions
  // the effect of `true` is likely going to be the default and only way. It is
  // highly recommended that new implementations set this value to `true`.
  nullableArrayItems: true,
  // Indicates how to define the `ID` scalar as part of a JSON Schema. Valid options
  // are `string`, `number`, or `both`. Defaults to `string`
  IdTypeMapping: 'string'
}

const introspectionQuery: IntrospectionQuery = introspectionFromSchema(parsed_schema);
const jsonSchema = fromIntrospectionQuery(introspectionQuery, options);
console.log(jsonSchema);

//npx ts-node index.ts > schema.json