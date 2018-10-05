import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getIsFetched, getIsFetching, getRepos } from '../../reducers/repos';
import { fetchUserReposRequest } from '../../actions/repos';
import Spinner from 'react-svg-spinner';
import styled from 'styled-components';

const ReposWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 200px;
  margin-top: 20px;
  overflow-x: scroll;
`;

const Repo = styled.p`
  margin: 5px 0;
`;

class Repos extends PureComponent {
  componentDidMount() {
    const { isFetched, login, fetchUserReposRequest } = this.props;
    if (!isFetched) {
      fetchUserReposRequest(login);
    }
  }
  render() {
    const { isFetching, repos } = this.props;

    if (isFetching) return <Spinner size="64px" color="fuchsia" gap={5} />;

    return <ReposWrapper>{repos.map(repo => <Repo key={repo.id}>{repo.name}</Repo>)}</ReposWrapper>;
  }
}

const mapStateToProps = state => ({
  repos: getRepos(state),
  isFetching: getIsFetching(state),
  isFetched: getIsFetched(state),
});
export default connect(mapStateToProps, { fetchUserReposRequest })(Repos);
