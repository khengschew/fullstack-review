import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => (
  <div>
    <h4 key="header"> Repo List Component </h4>
    There are {props.repos.length} repos.
    <table key="repoTable">
      <tbody key="repoTableBody">
        <tr key="repoTableHeader">
          <th key="repoTableName">Name</th>
          <th key="repoTableOwner">Owner</th>
          <th key="repoTableWatchers">Watchers</th>
        </tr>
        {props.repos.map((repo, i) => (
          <Repo repo={repo} index={i}/>
        ))}
      </tbody>
    </table>
  </div>
)

export default RepoList;