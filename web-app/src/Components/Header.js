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
        <header className='header'>
            <nav className='navbar'>
                <a href='#brand' className='navbar__brand'>AllStudents</a>
                <ul className='navbar__ul ul__links'>
                    <li className='navbar__item'>
                        <Link className='navbar__link' to='/Main'>Главная</Link>
                    </li>
                    <li className='navbar__item'>
                        <Link className='navbar__link' to='/ApiTest'>ApiTest</Link>
                    </li>
                    <li className='navbar__item'>
                        <a className='navbar__link' href='http://localhost:8000/students/'>RestAPI</a>
                    </li>
                </ul>
                <ul className='navbar__ul'>
                    <li className='navbar__item'>
                        <a className='navbar__link' href='#logout' onClick={this.logout}>Выйти</a>
                    </li>
                </ul>
            </nav>
        </header>
    )}
}