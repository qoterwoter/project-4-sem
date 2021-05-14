import React from 'react'
import './App.css';
import ApiTest from'./Api/ApiTest'
import Header from './Components/Header'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './Components/Main';
import LoginForm from './Components/LoginForm';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      is_logged: sessionStorage.getItem('token') ? true: false,
      users: [],
      token: null,
    }
  }
  onChangeToken = e => {
    this.setState(e)
  }
  getPermissions = event => {
    fetch('http://localhost:8000/api/users/',{
      method: "GET",
      headers: {
        'Content-type' :'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(res=>{
      this.setState({users:res})
      this.state.users.map(user=>{
        console.log(user)
        if(user.username===sessionStorage.getItem('username')) {
          sessionStorage.setItem('is_staff',user.is_staff)
          sessionStorage.setItem('is_superuser',user.is_superuser)
        }
      })
    })

  }
  componentDidMount() {
    if(sessionStorage.getItem('token')!==null){
      this.getPermissions()
    }
  }
  render() {
    if(sessionStorage.getItem('token')===null||sessionStorage.getItem('token')===undefined) {
      return (
      <Router>
        <LoginForm token={this.state.token}/>
      </Router>
      )
    } else {
    return(
    <Router>
      <Header/>
      <Switch>
      <Route path='/Main'>
          <Main/>
        </Route>
        <Route path='/ApiTest'>
          <ApiTest/>
        </Route>
      </Switch>
    </Router> 
  )}}
}

export default App;
