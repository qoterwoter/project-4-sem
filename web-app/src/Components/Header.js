import React from 'react'
import {Link} from 'react-router-dom'
import '../Styles/Style.css'

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
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <a href='#brand' className='navbar-brand'>AllStudents</a>
                <div className='my-nav'>
                    <ul className='navbar-nav '>
                        <li className='nav-link'>
                            <Link className='nav-item nav-link' to='/Main'>Главная</Link>
                        </li>
                        <li className='nav-link'>
                            <Link className='nav-item nav-link' to='/ApiTest'>ApiTest</Link>
                        </li>
                        <li className='nav-link'>
                            <a className='nav-item nav-link' href='http://localhost:8000/students/'>RestAPI</a>
                        </li>
                    </ul>
                    <ul className='navbar-nav '>
                        <li className='nav-link'>
                            <a className='nav-item nav-link' href='#logout' onClick={this.logout}>Выйти</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )}
}