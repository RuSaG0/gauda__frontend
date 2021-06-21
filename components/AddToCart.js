import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import StyledButton from './styled/StyledButton';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
    }
  }
`;

export default class AddToCart extends React.Component {
  update = itemId => (cache, payload) => {
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    const { cart } = data.me;
    const isInCart = cart.filter(el => el.item.id === itemId).length > 0;
    if (isInCart) {
      const index = cart.map(el => el.item.id).indexOf(itemId);
      const qty = cart[index].quantity;
      data.me.cart[index].quantity = qty + 1;
      cache.writeQuery({ query: CURRENT_USER_QUERY, data });
    } else {
      return null;
    }
  };

  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={ADD_TO_CART_MUTATION}
        variables={{ id }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        optimisticResponse={{
          __typename: 'Mutation',
          addToCart: {
            __typename: 'CartItem',
            id
          }
        }}
      >
        {(addToCart, { loading, error, called }) => (
          <StyledButton onClick={addToCart} disabled={loading && !called}>
            Add{loading ? 'ing' : ''} To Cart
            {called && loading ? '...' : ''}
          </StyledButton>
        )}
      </Mutation>
    );
  }
}
