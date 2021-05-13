import React from 'react'
import {Link} from 'react-router-dom'

export default class Header extends React.Component {

    logout = event => {
        event.preventDefault();
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('is_staff')
        sessionStorage.removeItem('is_superuser')
        setTimeout(()=> {
            window.location.reload()
        },100)
    }

    render() {return(
        <header>
            <nav className='navbar navbar-expand navbar-light bg-light'>
                <a href='#' className='navbar-brand'>AllStudents</a>
                <ul className='navbar-nav mr-auto'>
                    <li className='nav-link'>
                        <Link className='nav-item nav-link' to='/Main'>Главная</Link>
                    </li>
                    <li className='nav-link'>
                        <Link className='nav-item nav-link' to='/ApiTest'>ApiTest</Link>
                    </li>
                    <li className='nav-link'>
                        <a className='nav-item nav-link' href='#' onClick={this.logout}>Выйти</a>
                    </li>
                    <li className='nav-link'>
                        <a className='nav-item nav-link' href='http://localhost:8000/students/'>RestAPI</a>
                    </li>
                </ul>
            </nav>
        </header>
    )}
}