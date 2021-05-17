import React from 'react'
import { withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import '../Styles/Style.css'

class Header extends React.Component {

    logout = event => {
        event.preventDefault();
        this.props.setLogged(false)
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('is_staff')
        sessionStorage.removeItem('is_superuser')
        this.props.history.push("/");
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
const HeaderWithRouter = withRouter(Header)
export default HeaderWithRouter