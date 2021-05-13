import React, {Component} from 'react';
import RouteMain from './RouteMain';
class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      credentials: {
        username: '',
        password: '',
      },
      data: {},
    }
  }
  login = event => {
    event.preventDefault()
    fetch('http://localhost:8000/auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.credentials)
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res.token)
      this.setState({data:res})
      sessionStorage.setItem('token',res.token)
    })
    .catch(err=>console.error(err))

    if(sessionStorage.getItem('token')!='' || sessionStorage.getItem('token')!=undefined) {
      this.context.router.transitionTo('/Main')
    }
  }

  inputChange = event => {
    let cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({credentials: cred});
  }

  render() {return(
    <div>
      <h1>Войдите</h1>
      <form>
        <label>
          Имя пользователя:
          <input 
            type='text'
            name="username"
            value={this.state.credentials.username}
            onChange={this.inputChange}
          />
        </label>
        <label>
          Пароль:
          <input
            type="password"
            name="password"
            value={this.state.credentials.password} 
            onChange={this.inputChange}
          />
        </label>
        <button onClick={this.login}>Войти</button>
        <RouteMain/>
      </form>
    </div>
  )}
}
