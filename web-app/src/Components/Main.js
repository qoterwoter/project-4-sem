import React from 'react'
import Staff from './Staff'
import Admin from './Admin'

export default class Main extends React.Component {
    render() {
        return(
        <main>
            <div className='mainPage'>
                <h2 className="mainPage__title">Мой проект</h2>
            </div>
            {this.props.is_staff===true
            ? <Staff/>
            : null
            }
            {this.props.is_superuser===true
            ? <Admin/>
            : null
            }
        </main>
    )}
}