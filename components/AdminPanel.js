/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import styled from 'styled-components';
import Container from './styled/Container';
import Permissions from './Permissions';
import AdminItems from './AdminItems';
import AdminOrders from './AdminOrders';

const Controls = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;

  .control {
    flex-grow: 1;
    display: flex;

    & input {
      display: none;

      &:checked + label {
        opacity: 1;
        border-bottom: 5px solid ${({ theme }) => theme.mainColor};
      }
    }

    & label {
      font-size: 16px;
      font-weight: bold;
      text-transform: uppercase;
      opacity: 0.7;
      flex-grow: 1;
      text-align: center;
      padding: 10px;
      transition: 225ms;
      cursor: pointer;
      border-bottom: 5px solid transparent;
    }
  }
`;

export default class AdminPanel extends React.Component {
  state = {
    stage: 'items',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { stage } = this.state;

    return (
      <Container>
        <h1>Admin Panel</h1>
        <Controls>
          <div className="control">
            <input
              type="radio"
              name="stage"
              value="items"
              id="items"
              checked={stage === 'items'}
              onChange={this.handleChange}
            />
            <label htmlFor="items">Items</label>
          </div>
          <div className="control">
            <input
              type="radio"
              name="stage"
              value="users"
              id="users"
              checked={stage === 'users'}
              onChange={this.handleChange}
            />
            <label htmlFor="users">Users</label>
          </div>
          <div className="control">
            <input
              type="radio"
              name="stage"
              value="orders"
              id="orders"
              checked={stage === 'orders'}
              onChange={this.handleChange}
            />
            <label htmlFor="orders">Orders</label>
          </div>
        </Controls>
        <Container>
          {stage === 'users' && <Permissions />}
          {stage === 'items' && <AdminItems />}
          {stage === 'orders' && <AdminOrders />}
        </Container>
      </Container>
    );
  }
}
