import React, { PureComponent } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { logout } from 'ducks/auth';
import { getIsAuthorized } from 'ducks/auth';
import { getIsNetworkErrorPresent, getNetworkError } from 'ducks/network';
import { connect } from 'react-redux';
import UserPage from 'components/UserPage';
import Login from 'components/Login';
import PrivateRoute from 'components/PrivateRoute';
import styled from 'styled-components';

const ServiceBlock = styled.div`
  width: 400px;
  margin: 50px auto 20px;
  text-align: center;
`;

const Error = styled.p`
  color: red;
`;

class AppRouter extends PureComponent {
  render() {
    const { logout, isAuthorized, isNetworkErrorPresent, networkError } = this.props;
    return (
      <main>
        {isAuthorized && (
          <ServiceBlock>
            <button onClick={logout}>Logout</button>
          </ServiceBlock>
        )}
        {isNetworkErrorPresent && (
          <ServiceBlock>
            <Error>{networkError}</Error>
          </ServiceBlock>
        )}
        <Switch>
          <PrivateRoute path="/user/me" component={UserPage} />
          <PrivateRoute path="/user/:name" component={UserPage} />
          <Route path="/login" exact component={Login} />
          <Redirect to="/user/me" />
        </Switch>
      </main>
    );
  }
}
const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state),
  isNetworkErrorPresent: getIsNetworkErrorPresent(state),
  networkError: getNetworkError(state),
});

const mapDispatchToProps = {
  logout,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppRouter));
