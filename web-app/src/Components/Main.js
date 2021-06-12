import React from 'react'
import Staff from './Staff'
import Admin from './Admin'

export default class Main extends React.Component {
    render() {
        return(
        <main>
            <div className='mainPage'>
                <h1 className="mainPage__title">Здравствуйте, {localStorage.getItem('username')}</h1>
            </div>
            {this.props.is_staff===true||localStorage.getItem('is_staff')==="true"
            ? <Staff/>
            : null
            }
            {this.props.is_superuser===true||localStorage.getItem('is_superuser')==="true"
            ? <Admin/>
            : null
            }
        </main>
    )}
}