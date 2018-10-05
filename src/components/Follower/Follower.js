import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AvatarWrapper = styled.div`
  width: 100px;
  height: 100px;
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

const UserInfo = styled.div`
  padding-left: 20px;
  text-align: left;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px;
`;

class Follower extends PureComponent {
  render() {
    const { follower } = this.props;
    return (
      <Container>
        <AvatarWrapper>
          <Avatar src={follower.avatar_url} alt={follower.login} />
        </AvatarWrapper>
        <UserInfo>
          <Link to={`/user/${follower.login}`}>
            <h3>{follower.login}</h3>
          </Link>
        </UserInfo>
      </Container>
    );
  }
}

export default Follower;
