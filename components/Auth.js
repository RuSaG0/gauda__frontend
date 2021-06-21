import React from 'react';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Overlay from './styled/Overlay';
import { CURRENT_USER_QUERY } from './User';

import { SignIn, SignUp, Forgot } from './Forms';

const LOCAL_STATE_QUERY = gql`
  query {
    authOverlayOpen @client
  }
`;

const TOGGLE_AUTH_MUTATION = gql`
  mutation {
    toggleAuth @client
  }
`;

export default class Auth extends React.Component {
  state = {
    stage: 'signIn',
  };

  handleOverlayClick = (e, fn) => {
    if (e.target.id === 'authOverlay') {
      fn();
    }
  };

  navigate = stage => () => this.setState({ stage });

  render() {
    const { stage } = this.state;
    const { active } = this.props;

    return (
      <Query query={LOCAL_STATE_QUERY}>
        {({ data }) => (
          <Mutation mutation={TOGGLE_AUTH_MUTATION}>
            {(toggleAuth, payload) => (
              <Overlay
                shown={data.authOverlayOpen}
                onClick={e => {
                  this.handleOverlayClick(e, toggleAuth);
                }}
                id="authOverlay"
              >
                {stage === 'signIn' && (
                  <SignIn
                    toSignUp={this.navigate('signUp')}
                    toForgot={this.navigate('forgot')}
                  />
                )}
                {stage === 'signUp' && (
                  <SignUp toSignIn={this.navigate('signIn')} />
                )}
                {stage === 'forgot' && (
                  <Forgot toSignIn={this.navigate('signIn')} />
                )}
              </Overlay>
            )}
          </Mutation>
        )}
      </Query>
    );
  }
}

export { TOGGLE_AUTH_MUTATION };
