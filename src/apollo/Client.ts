import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { defaults, resolvers } from './LocalState';

import { AsyncStorage } from 'react-native';
import { Definition } from '../types';
import { GRAPHQL_URL } from '../apis/urls';
import { WebSocketLink } from 'apollo-link-ws';
import cookie from 'js-cookie';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';

const httpLink = new HttpLink({
  uri: `${GRAPHQL_URL}`,
  // headers: {
  //   authorization: `Bearer ${cookie.get('token')}`,
  // },
});

const wsLink = new WebSocketLink({
  uri: `ws://${GRAPHQL_URL}`,
  options: { reconnect: true },
});

const cache = new InMemoryCache();

cache.writeData({
  data: defaults,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: token,
    },
  };
});

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers,
});
