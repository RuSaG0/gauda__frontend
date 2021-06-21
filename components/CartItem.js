import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import RemoveFromCart from './RemoveFromCart';

import formatMoney from '../lib/formatMoney';

const CartItemBody = styled.li`
  display: flex;
  align-items: center;
  padding: 0 15px;
  flex-direction: row;
  margin-bottom: 5px;

  .info {
    display: flex;
    flex-direction: column;
    padding-left: 15px;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
  }

  .total {
    display: inline-flex;
    margin-left: 10px;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 3px solid ${({ theme }) => theme.mainColor};
    padding: 5px 10px;
    transform: skew(-5deg);
  }
`;

const GET_ITEM_QUERY = gql`
  query GET_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      title
      price
      category
      image
    }
  }
`;

const CartItem = ({ cartItem }) => {
  // check if item exists
  if (!cartItem.item)
    return (
      <div>
        <p>Item has been removed from database.</p>
        <RemoveFromCart id={cartItem.id} />
      </div>
    );
  return (
    <CartItemBody>
      <img
        className="image"
        width={100}
        height={100}
        src={cartItem.item.image}
        alt={cartItem.item.title}
      />
      <div className="info">
        <strong className="title">{cartItem.item.title}</strong>
        <strong className="count">
          {cartItem.quantity} x {formatMoney(cartItem.item.price)}
          <span className="total">
            = {formatMoney(cartItem.quantity * cartItem.item.price)}
          </span>
        </strong>
        <RemoveFromCart id={cartItem.id} />
      </div>
    </CartItemBody>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
};

export default CartItem;
