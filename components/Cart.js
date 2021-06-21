import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';
import Link from 'next/link';

import CartBody from './styled/CartBody';
import CartItem from './CartItem';
import User from './User';
import StyledButton from './styled/StyledButton';
import Payment from './Payment';

import cartTotalPrice from '../lib/cartTotalPrice';
import formatMoney from '../lib/formatMoney';

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
    authOverlayOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

/* eslint-disable */
const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toggleCart: ({ render }) => (
    <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
});
/* eslint-enable */

const Cart = () => (
  <Composed>
    {({ user, toggleCart, localState }) => {
      const { me } = user.data;
      if (!me) return null;
      return (
        <CartBody shown={localState.data.cartOpen}>
          <header>
            <div className="close-container" onClick={toggleCart}>
              <div className="leftright" />
              <div className="rightleft" />
            </div>
            <h2 className="cart__heading">Cart</h2>
            <p>
              {me.cart.length} item{me.cart.length > 1 ? 's' : ''}
            </p>
          </header>
          <ul>
            {me.cart.map(cartItem => (
              <CartItem cartItem={cartItem} key={cartItem.id} />
            ))}
          </ul>
          {me.cart.length > 0 && (
            <footer>
              <Link href="/neworder">
                <StyledButton>Proceed to order</StyledButton>
              </Link>
            </footer>
          )}
          {me.cart.length > 0 && (
            <footer>
              <h4>Total: {formatMoney(cartTotalPrice(me.cart))}</h4>
              <Payment>
                <StyledButton>Proceed to order</StyledButton>
              </Payment>
            </footer>
          )}
        </CartBody>
      );
    }}
  </Composed>
);

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
