/* eslint-disable */
/* prettier-ignore */

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  query: 'Query';
  mutation: never;
  subscription: never;
  types: {
    'Query': { kind: 'OBJECT'; name: 'Query'; fields: { 'character': { name: 'character'; type: { kind: 'OBJECT'; name: 'Character'; ofType: null; } }; 'characters': { name: 'characters'; type: { kind: 'OBJECT'; name: 'Characters'; ofType: null; } }; 'charactersByIds': { name: 'charactersByIds'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Character'; ofType: null; }; } }; 'location': { name: 'location'; type: { kind: 'OBJECT'; name: 'Location'; ofType: null; } }; 'locations': { name: 'locations'; type: { kind: 'OBJECT'; name: 'Locations'; ofType: null; } }; 'locationsByIds': { name: 'locationsByIds'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Location'; ofType: null; }; } }; 'episode': { name: 'episode'; type: { kind: 'OBJECT'; name: 'Episode'; ofType: null; } }; 'episodes': { name: 'episodes'; type: { kind: 'OBJECT'; name: 'Episodes'; ofType: null; } }; 'episodesByIds': { name: 'episodesByIds'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Episode'; ofType: null; }; } }; }; };
    'ID': unknown;
    'Int': unknown;
    'Character': { kind: 'OBJECT'; name: 'Character'; fields: { 'id': { name: 'id'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; } }; 'name': { name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'status': { name: 'status'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'species': { name: 'species'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'type': { name: 'type'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'gender': { name: 'gender'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'origin': { name: 'origin'; type: { kind: 'OBJECT'; name: 'Location'; ofType: null; } }; 'location': { name: 'location'; type: { kind: 'OBJECT'; name: 'Location'; ofType: null; } }; 'image': { name: 'image'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'episode': { name: 'episode'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Episode'; ofType: null; }; }; } }; 'created': { name: 'created'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'String': unknown;
    'Location': { kind: 'OBJECT'; name: 'Location'; fields: { 'id': { name: 'id'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; } }; 'name': { name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'type': { name: 'type'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'dimension': { name: 'dimension'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'residents': { name: 'residents'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Character'; ofType: null; }; }; } }; 'created': { name: 'created'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'Episode': { kind: 'OBJECT'; name: 'Episode'; fields: { 'id': { name: 'id'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; } }; 'name': { name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'air_date': { name: 'air_date'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'episode': { name: 'episode'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'characters': { name: 'characters'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Character'; ofType: null; }; }; } }; 'created': { name: 'created'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'FilterCharacter': { kind: 'INPUT_OBJECT'; name: 'FilterCharacter'; inputFields: [{ name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'status'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'species'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'type'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'gender'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }]; };
    'Characters': { kind: 'OBJECT'; name: 'Characters'; fields: { 'info': { name: 'info'; type: { kind: 'OBJECT'; name: 'Info'; ofType: null; } }; 'results': { name: 'results'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Character'; ofType: null; }; } }; }; };
    'Info': { kind: 'OBJECT'; name: 'Info'; fields: { 'count': { name: 'count'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; } }; 'pages': { name: 'pages'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; } }; 'next': { name: 'next'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; } }; 'prev': { name: 'prev'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; } }; }; };
    'FilterLocation': { kind: 'INPUT_OBJECT'; name: 'FilterLocation'; inputFields: [{ name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'type'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'dimension'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }]; };
    'Locations': { kind: 'OBJECT'; name: 'Locations'; fields: { 'info': { name: 'info'; type: { kind: 'OBJECT'; name: 'Info'; ofType: null; } }; 'results': { name: 'results'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Location'; ofType: null; }; } }; }; };
    'FilterEpisode': { kind: 'INPUT_OBJECT'; name: 'FilterEpisode'; inputFields: [{ name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'episode'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }]; };
    'Episodes': { kind: 'OBJECT'; name: 'Episodes'; fields: { 'info': { name: 'info'; type: { kind: 'OBJECT'; name: 'Info'; ofType: null; } }; 'results': { name: 'results'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Episode'; ofType: null; }; } }; }; };
    'CacheControlScope': { kind: 'ENUM'; name: 'CacheControlScope'; type: 'PUBLIC' | 'PRIVATE'; };
    'Upload': unknown;
    'Boolean': unknown;
  };
};

import * as gqlTada from 'gql.tada';

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}