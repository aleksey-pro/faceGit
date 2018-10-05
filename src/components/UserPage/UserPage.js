import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getUser, getIsFetching, getIsFetched } from 'ducks/users';

import { fetchUserRequest, fetchTokenOwnerRequest } from 'ducks/followers';

import Spinner from 'react-svg-spinner';
import styled from 'styled-components';
import Followers from '../Followers';

const Container = styled.div`
  margin: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AvatarWrapper = styled.div`
  width: 300px;
  height: 300px;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #eee;
`;
const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const UserInfo = styled.div`
  padding-left: 20px;
  text-align: left;
`;

class UserPage extends PureComponent {
  constructor(props) {
    super(props);
    const {
      fetchTokenOwnerRequest,
      fetchUserRequest,
      match: {
        params: { name },
      },
    } = this.props;
    if (name == null) fetchTokenOwnerRequest();
    else fetchUserRequest(name);
  }

  componentDidUpdate(prevProps) {
    const {
      fetchTokenOwnerRequest,
      fetchUserRequest,
      match: {
        params: { name },
      },
    } = this.props;

    if (name !== prevProps.match.params.name) {
      if (name == null) fetchTokenOwnerRequest();
      else fetchUserRequest(name);
    }
  }

  render() {
    const {
      user,
      match: {
        params: { name },
      },
      isFetching,
      isFetched,
    } = this.props;

    if (isFetching || !isFetched) {
      return (
        <Container>
          <Spinner size="64px" color="fuchsia" gap={5} />
        </Container>
      );
    }

    if (!user) {
      return <p>User {name} not founded!</p>;
    }

    return (
      <Container>
        <UserContainer>
          <AvatarWrapper>
            <Avatar src={user.avatar_url} alt={user.login} />
          </AvatarWrapper>
          <UserInfo>
            <h3>{user.login}</h3>
            <p>Followers: {user.followers}</p>
            <p>Public repos: {user.public_repos}</p>
          </UserInfo>
        </UserContainer>
        <Followers login={user.login} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  isFetching: getIsFetching(state),
  isFetched: getIsFetched(state),
});

export default connect(mapStateToProps, { fetchUserRequest, fetchTokenOwnerRequest })(UserPage);
