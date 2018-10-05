import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authorize } from 'ducks/auth';
import styled from 'styled-components';
import { getIsAuthorized } from 'ducks/auth';
import { Redirect } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  width: 300px;
`;

const Input = styled.input`
  width: 100%;
`;

class Login extends Component {
  state = {
    input: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ input: value });
  };

  handleKeyPress = event => {
    if (event.nativeEvent.keyCode === 13) {
      this.props.authorize(this.state.input);
    }
  };
  render() {
    const { input } = this.state;
    const { isAuthorize } = this.props;

    if (isAuthorize) {
      return <Redirect to="/" />;
    }

    return (
      <Container>
        <Card>
          <p>
            Получить токен нужно на своей странице github, перейдите по{' '}
            <a href="https://github.com/settings/tokens">адресу</a> и создать себе токен. Запишите
            куда нибудь токен, так как после создания доступ к нему будет только один раз.
          </p>
          <Input
            placeholder="auth_token"
            value={input}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          <p>После ввода нажать Enter</p>
        </Card>
      </Container>
    );
  }
}

export default connect(
  state => ({
    isAuthorize: getIsAuthorized(state),
  }),
  { authorize },
)(Login);
