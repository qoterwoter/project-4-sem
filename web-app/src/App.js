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
      token: null,
      is_staff: sessionStorage.getItem('is_staff'),
      is_superuser: sessionStorage.getItem('is_superuser'),
    }

    this.setLoggedStatus = this.setLoggedStatus.bind(this)
    this.setisStaffIsSuperuser = this.setisStaffIsSuperuser.bind(this)
  }
  onChangeToken = e => {
    this.setState(e)
  }
  componentDidMount() {
    if(sessionStorage.getItem('token')!==undefined){
      this.setState({'is_logged':false})
    }
  }
  setisStaffIsSuperuser(is_staff,is_superuser) {
    this.setState({'is_staff':is_staff,'is_superuser':is_superuser})
  }
  setLoggedStatus(e) {
    this.setState({'is_logged':e});
  }
  render() {
    if(sessionStorage.getItem('token')===null||sessionStorage.getItem('token')===undefined) {
      return (
      <Router>
        <LoginForm 
          token={this.state.token}
          url={this.state.url}
          is_logged={this.state.is_logged}
          setLogged={this.setLoggedStatus}
          is_staff={this.state.is_staff}
          is_superuser={this.state.is_superuser}
          set_status={this.setisStaffIsSuperuser}
        />
      </Router>
      )
    } else {
    return(
    <Router>
      <Header
          token={this.state.token}
          url={this.state.url}
          is_logged={this.state.is_logged}
          setLogged={this.setLoggedStatus}
          is_staff={this.state.is_staff}
          is_superuser={this.state.is_superuser}
          set_status={this.setisStaffIsSuperuser}
        />
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
