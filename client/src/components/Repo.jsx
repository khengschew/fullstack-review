import React from 'react';

var Repo = (props) => (
  <tr key={props.index}>
    <td key={`name${props.index}`}><a href={props.repo.url}>{props.repo.name}</a></td>
    <td key={`owner${props.index}`}>{props.repo.owner_login}</td>
    <td key={`watchers${props.index}`}>{props.repo.watchers_count}</td>
  </tr>
)

export default Repo;