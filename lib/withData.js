// Конфигурация клиента для GraphQL, с помощью которой мы можем делать запросы к серверу на фронтэнде.
import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import gql from 'graphql-tag';
import { endpoint, deployEndpoint } from '../config';
import { LOCAL_STATE_QUERY } from '../components/Cart';

const typeDefs = gql`
  extend type Query {
    cart: [ID!]!
  }
`;

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cart @client
  }
`;

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : deployEndpoint,
    cache: new InMemoryCache(),
    request: operation => {
      operation.setContext({
        fetchOptions: {
          // Это будет нужно для отслеживания текущего юзера
          credentials: 'include',
        },
        headers,
      });
    },
    // Local data
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, varibales, { cache }) {
            // read cartOpen value from the cache
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            // set new state
            const data = {
              data: { cartOpen: !cartOpen },
            };
            // write it to the cache
            cache.writeData(data);
            return data;
          },
          toggleAuth(_, variables, { cache }) {
            const { authOverlayOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            console.log(authOverlayOpen);
            const data = {
              data: { authOverlayOpen: !authOverlayOpen },
            };
            console.log(data.data.authOverlayOpen);
            cache.writeData(data);
            return data;
          },
        },
      },
      typeDefs,
      defaults: {
        cartOpen: false,
        authOverlayOpen: false,
      },
    },
  });
}

// Отдаём хай-ордер компонент, нам нужно будет обернуть всё приложение в него.
export default withApollo(createClient);
