import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { MockLink } from 'apollo-link-mock';

export function createClient(mocks) {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new MockLink(mocks),
  });
}
