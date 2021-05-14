import React from 'react'
import Staff from './Staff'
import Admin from './Admin'

export default class Main extends React.Component {
    render() {
        return(
        <main className='container'>
            <h2>Мой проект</h2>
            {sessionStorage.getItem('is_staff')==="true"
            ? <Staff/>
            : null
            }
            {sessionStorage.getItem('is_superuser')==="true"
            ? <Admin/>
            : null
            }
        </main>
    )}
}