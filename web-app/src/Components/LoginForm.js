import React from 'react';
import { withRouter} from 'react-router-dom'
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
    fetch(`${this.props.url}auth/`, {
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
      if(res.token!==null||res.token!==undefined) {
        sessionStorage.setItem('token',res.token)
      }
    })
    .catch(err=>console.error(err))


    if(sessionStorage.getItem('token')!==null || sessionStorage.getItem("token")!==undefined || sessionStorage.getItem('token')!=='') {
      this.props.history.push("/Main")
      setTimeout(()=>{
        window.location.reload()
      },200)
    }
  }

  inputChange = event => {
    let cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({credentials: cred});
    sessionStorage.setItem('username',cred.username)
  }

  render() {
    return(
    <div className='loginForm'>
      <h1 className='loginForm__title'>Войдите</h1>
      <form>
        <div className='loginForm__div'>
          <label className='loginForm__label' for='username'>
            Имя пользователя:
          </label>
            <input 
              id='username'
              className='loginForm__input'
              type='text'
              name="username"
              value={this.state.credentials.username}
              onChange={this.inputChange}
            />
        </div>
        <div className='loginForm__div'>
          <label className='loginForm__label' for='password'>
            Пароль:
          </label>
          <input
            id='password'
            className='loginForm__input'
            type="password"
            name="password"
            value={this.state.credentials.password} 
            onChange={this.inputChange}
          />
        </div>
        <button className='loginForm__button' onClick={this.login}>Войти</button>
      </form>
    </div>
  )}
}

const LoginWithRouter = withRouter(Login)
export default LoginWithRouter