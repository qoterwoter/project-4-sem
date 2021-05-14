import React from 'react';
import ApiService from './ApiService'

const apiService = new ApiService();

export default class ApiTest extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            students:[]
        }
    }
    componentDidMount() {
        apiService.getStudents().then(response=> {
            this.setState({students: response.data})
        })
    
    }


    getStatus(status) {
        let outStat;
        switch(status) {
            case 'q':
                outStat = 'Зачислен на'
                break
            case 'y':
                outStat = 'Учится на'
                break
            case 'a':
                outStat = 'Решается об обучении на'
                break
            case 'n':
                outStat = 'Отчислен после'
                break
            default:
                break
        }
        return outStat
    }

    render()  {
        return (
            <main className='container'>
                <h2>Список студентов</h2>
                <ul>
                {this.state.students.map((student)=>
                    <li key={student.id}>
                        #{student.id}: {student.name} {student.surname}<br/>
                        {this.getStatus(student.status)} {student.course} курсе
                    </li>
                )}
                </ul>
            </main>
        )
    }
}