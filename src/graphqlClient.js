import { GraphQLClient } from "graphql-request";

const url = 'https://ciudadojeda.stepzen.net/api/eerie-indri/__graphql';

const client =  new GraphQLClient(url , {headers: {
    Authorization:
      'apikey ciudadojeda::stepzen.io+1000::5696dceae3a296b2b219b918c7020d97f48394c3c3f7fe6405bba76bf36d7aca'}
});

export default client;