import React from 'react'
import './App.css';
import ApiTest from'./Api/ApiTest'
import Header from './Components/Header'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './Components/Main';
import LoginForm from './Components/LoginForm';
import CreateUpdateStudent from './Components/CreateUpdateStudent'
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      is_logged: sessionStorage.getItem('token') ? true: false,
      users: [],
      token: null,
      is_staff: sessionStorage.getItem('is_staff'),
      is_superuser: sessionStorage.getItem('is_superuser'),
      // url: 'http://localhost:8000/'
      url: 'http://localhost:8000/'
    }
  }
  onChangeToken = e => {
    this.setState(e)
  }
  getPermissions = event => {
    fetch(`${this.state.url}api/users/`,{
      method: "GET",
      headers: {
        'Content-type' :'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(res=>{
      this.setState({users:res})
      this.state.users.map((user)=>{
          if(user.username===sessionStorage.getItem('username')) {
            this.setState({'is_staff':user.is_staff})
            this.setState({'is_superuser':user.is_superuser})
            console.log(`is_staff: ${this.state.is_staff}`)
            console.log(`is_superuser: ${this.state.is_superuser}`)
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
        <LoginForm 
          token={this.state.token}
          url={this.state.url}
        />
      </Router>
      )
    } else {
    return(
    <Router>
      <Header/>
      <Switch>
      <Route path='/Main'>
          <Main
            is_staff={this.state.is_staff}
            is_superuser={this.state.is_superuser}
          />
        </Route>
        <Route path='/ApiTest'>
          <ApiTest
            url = {this.state.url}
          />
        </Route>
        <Route path='/CreateUpdateStudent' component={CreateUpdateStudent}>
        </Route>
        {/* <Route path='/CreateUpdateStudent/:id' component={CreateUpdateStudent}> */}
        <Route path='/CreateUpdateStudent/?id=id'> render={(props)=> <CreateUpdateStudent {...props}/>}
        </Route>
      </Switch>
    </Router> 
  )}}
}

export default App;
