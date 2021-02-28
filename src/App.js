import React, { Component, Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route, BrowserRouter }  from "react-router-dom" ;
import './App.css';
import Navbar from "./component/layout/Navbar"
import Users from "./component/users/Users"
import Search from "./component/users/Search"
import Alert from "./component/layout/Alert"
import About from "./component/pages/About"
import axios from "axios"

import User from "./component/users/User"

class App extends Component{ 

 state = { 
   users:[], 
   user: {},
  repos:[],
  loading: false,
  alert: null
}

//  async componentDidMount() {
//  this.setState({loading: true});
//  const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
//  this.setState({users:res.data, loading: false});
// }

//Search github users 
searchUsers = async text => {
this.setState({loading: true});
 const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
 this.setState({users:res.data.items, loading: false});
 }

 // get single Github user
 getUser = async(username) => {
  this.setState({loading: true});
  const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
 this.setState({user:res.data, loading: false});
 }


  // get single Github user
  getUserRepos = async(username) => {
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
   this.setState({repos:res.data, loading: false});
   }

 // clear users function
 clearUser = () => this.setState({ users:[], loading: false })

 // set Alert function
 setAlert = (msg, type) => {
    this.setState({alert:{ msg, type }});
    setTimeout(() => this.setState({alert:null}), 5000)
 }

  render(){
    const {users,user, loading, repos } = this.state
  return (
    <Router> 
    <div className="App">
    <Navbar/>
    <div className="container">
    <Alert alert={this.state.alert}></Alert>
    <Switch>
      <Route exact path='/' render={ props => (
        <Fragment>
        <Search 
          searchUsers={this.searchUsers} 
          clearUser={this.clearUser}
          showClear={ users.length > 0 ? true : false }
          setAlert={this.setAlert}
        />
        <Users loading={loading } users={users}  />
        </Fragment>
      )}  />
      <Route exact path="/about" component={About}/>
      <Route exact path="/user/:login" render = {
        props =>(
          <Fragment>
            <User {...props } 
            getUser={this.getUser} 
            user={user} 
            getUserRepos={ this.getUserRepos}
            repos={repos}
            loading={loading }/>
          </Fragment> 
          )
      }/>
    </Switch>
    </div>
    </div>
    </Router>
  );
}
}

export default App;
