import React from 'react';
import ApiService from './ApiService'

const apiService = new ApiService();
const link = 'students';
export default class ApiTest extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            students:[]
        }
    }
    componentDidMount() {
        apiService.getDatas(link).then(response=> {
            this.setState({students: response.data})
        })
    
    }


    render()  {
        return (
            <main className='container'>
                <h2>Список студентов</h2>
                <ul>
                {this.state.students.map((student)=>
                    <li key={student.id}>
                        #{student.id}: {student.name} {student.surname}<br/>
                        {apiService.getStatus(student.status,'на','после')} {student.course} курсе
                    </li>
                )}
                </ul>
            </main>
        )
    }
}