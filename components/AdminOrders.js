/* eslint-disable react/no-multi-comp */
import React from 'react';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import moment from 'moment';
import Table from './styled/Table';
import Container from './styled/Container';
import StyledButton from './styled/StyledButton';
import formatMoney from '../lib/formatMoney';

const ADMIN_ORDERS_QUERY = gql`
  query {
    adminOrders {
      id
      createdAt
      items {
        id
        title
        quantity
      }
      total
    }
  }
`;

export default class AdminOrders extends React.Component {
  render() {
    return (
      <Container>
        <Query query={ADMIN_ORDERS_QUERY}>
          {({ data, error, loading }) => (
            <Table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Items</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {data.adminOrders &&
                  data.adminOrders.map(order => (
                    <OrderRow order={order} key={order.id} />
                  ))}
              </tbody>
            </Table>
          )}
        </Query>
      </Container>
    );
  }
}

class OrderRow extends React.Component {
  render() {
    const { order } = this.props;
    return (
      <tr>
        <td>
          <p>{order.id}</p>
        </td>
        <td>
          <p>{moment(order.createdAt).format('MMMM Do YYYY, h:mm')}</p>
        </td>
        <td>
          <p>{formatMoney(order.total)}</p>
        </td>
        <td>
          <p>{order.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
        </td>
        <td>
          <Link
            href={{
              pathname: '/order',
              query: { id: order.id },
            }}
          >
            <a>
              <StyledButton>View</StyledButton>
            </a>
          </Link>
        </td>
      </tr>
    );
  }
}
