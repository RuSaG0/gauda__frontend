import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './AdminItems';
import StyledButton from './styled/StyledButton';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

export default class DeleteItem extends Component {
  update = (cache, payload) => {
    // Вручную обновить кэш на клиенте
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    console.log(data);
    // Отфильтровать удаленный айтем
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    // Засунуть обратно
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteItem, { error }) => (
          <StyledButton
            onClick={() => {
              if (confirm('Are you sure?')) {
                deleteItem();
              }
            }}
            secondary
          >
            {this.props.children}
          </StyledButton>
        )}
      </Mutation>
    );
  }
}
