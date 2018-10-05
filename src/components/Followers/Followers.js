import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getFollowers, fetchFollowersRequest, getIsFetching, getIsFetched } from 'ducks/followers';
import Spinner from 'react-svg-spinner';
import Follower from 'components/Follower';
import styled from 'styled-components';

const FollowersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px 60px;
`;

class Followers extends PureComponent {
  componentDidMount() {
    const { isFetched, login, fetchFollowersRequest } = this.props;

    if (!isFetched) {
      fetchFollowersRequest(login);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { login, fetchFollowersRequest } = this.props;

    if (login !== prevProps.login) {
      fetchFollowersRequest(login);
    }
  }

  render() {
    const { isFetching, followers } = this.props;

    if (isFetching) {
      return <Spinner size="64px" color="fuchsia" gap={5} />;
    }

    return (
      <FollowersWrapper>
        {followers.map(follower => <Follower key={follower.id} follower={follower} />)}
      </FollowersWrapper>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: getIsFetching(state),
  isFetched: getIsFetched(state),
  followers: getFollowers(state),
});

export default connect(mapStateToProps, { fetchFollowersRequest })(Followers);
