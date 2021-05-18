import React from 'react'
import Staff from './Staff'
import Admin from './Admin'

export default class Main extends React.Component {
    render() {
        return(
        <main>
            <div className='mainPage'>
                <h1 className="mainPage__title">Здравствуйте, {sessionStorage.getItem('username')}</h1>
            </div>
            {this.props.is_staff===true||sessionStorage.getItem('is_staff')==="true"
            ? <Staff/>
            : null
            }
            {this.props.is_superuser===true||sessionStorage.getItem('is_superuser')==="true"
            ? <Admin/>
            : null
            }
        </main>
    )}
}