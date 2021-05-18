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
      url: 'http://localhost:8000/',
      data: {},
      users: [],
      token: null,
    }
  }
  
  getPermissions = async event => {
    await fetch(`${this.state.url}api/users/`,{
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
            sessionStorage.setItem('is_staff',user.is_staff)
            sessionStorage.setItem('is_superuser',user.is_superuser)
            this.props.set_status(user.is_staff,user.is_superuser)
            console.log(this.props.is_staff,this.props.is_superuser)
        }
      })
    })
    this.props.history.push("/Main");
    this.props.setLogged(true)
  }
  login = async (event,callback) => {
    event.preventDefault()
    await fetch(`${this.state.url}auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.credentials)
    })
    .then(res=>res.json())
    .then(res=>{
      this.setState({data:res})
      if(res.token!==null && res.token!==undefined) {
        sessionStorage.setItem('token',res.token)
        this.setState({'token':res.token})
      }
    })
    .catch()

    if(sessionStorage.getItem('token')!==null ) {
      this.getPermissions();
      } else {
        alert('Вы ввели неверные данные')
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
        <button className='loginForm__button' onClick={e=>this.login(e)}>Войти</button>
      </form>
    </div>
  )}
}

const LoginWithRouter = withRouter(Login)
export default LoginWithRouter