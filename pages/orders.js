import React from 'react';
import { Query } from 'react-apollo';
import PleaseSignIn from '../components/PleaseSignIn';
import OrderList from '../components/OrderList';

const Orders = () => (
  <PleaseSignIn>
    <OrderList />
  </PleaseSignIn>
);

export default Orders;
