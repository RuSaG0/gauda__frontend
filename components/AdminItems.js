/* eslint-disable react/no-multi-comp */
import React from 'react';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import Link from 'next/link';
import gql from 'graphql-tag';
import CreateItem from './CreateItem';
import Table from './styled/Table';
import Container from './styled/Container';
import formatMoney from '../lib/formatMoney';
import StyledButton from './styled/StyledButton';
import DeleteItem from './DeleteItem';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($order: ItemOrderByInput = title_ASC) {
    items(orderBy: $order) {
      title
      id
      category {
        title
      }
      image
      price
    }
  }
`;

export default class AdminItems extends React.Component {
  state = {
    order: 'title_ASC'
  };

  render() {
    return (
      <Container>
        <Container>
          <Link href="/new">
            <a>
              <StyledButton>+ create new item</StyledButton>
            </a>
          </Link>
          {/* <CreateItem /> */}
        </Container>
        <Query
          query={ALL_ITEMS_QUERY}
          variables={this.state}
          pollInterval={500}
        >
          {({ data, error, loading }) => (
            <Table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>
                    <a
                      onClick={() =>
                        this.setState({
                          order:
                            this.state.order === 'title_DESC'
                              ? 'title_ASC'
                              : 'title_DESC'
                        })
                      }
                    >
                      Title
                    </a>
                  </th>
                  <th>
                    <a
                      onClick={() =>
                        this.setState({
                          order:
                            this.state.order === 'category_DESC'
                              ? 'category_ASC'
                              : 'category_DESC'
                        })
                      }
                    >
                      Category
                    </a>
                  </th>
                  <th>
                    <a
                      onClick={() =>
                        this.setState({
                          order:
                            this.state.order === 'price_DESC'
                              ? 'price_ASC'
                              : 'price_DESC'
                        })
                      }
                    >
                      Price
                    </a>
                  </th>
                  <th>Update</th>
                  <th>Delete</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {data.items &&
                  data.items.map(item => <ItemRow item={item} key={item.id} />)}
              </tbody>
            </Table>
          )}
        </Query>
      </Container>
    );
  }
}

class ItemRow extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <tr>
        <td>
          <img src={item.image} height={100} />
        </td>
        <td>{item.title}</td>
        <td>{item.category.title}</td>
        <td>{formatMoney(item.price)}</td>
        <td>
          <Link href={{ pathname: '/update', query: { id: item.id } }}>
            <a>
              <StyledButton>Update</StyledButton>
            </a>
          </Link>
        </td>
        <td>
          <DeleteItem id={item.id}>Delete Item</DeleteItem>
        </td>
        <td>
          <Link href={{ pathname: '/item', query: { id: item.id } }}>
            <a>
              <StyledButton>View</StyledButton>
            </a>
          </Link>
        </td>
      </tr>
    );
  }
}

export { ALL_ITEMS_QUERY };
