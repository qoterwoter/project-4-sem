import React from 'react'
import Staff from './Staff'
import Admin from './Admin'

export default class Main extends React.Component {
    render() {
        return(
        <main className='container'>
            <h2>Мой проект</h2>
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