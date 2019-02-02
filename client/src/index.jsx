import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

    this.refresh();
  }

  search (term) {
    console.log(`${term} was searched`);
    fetch('./repos', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({'term':term})
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        this.refresh();
      })
      .catch((err) => {
        console.error(err);
      })
  }

  refresh () {
    fetch('./repos')
      .then(res => res.json())
      .then((data) => {
        // Set state to data
        this.setState({
          repos: data
        });
      })
      .catch((err) => {
        console.error(err);
      })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));