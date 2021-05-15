import React from 'react'
import ApiService from '../Api/ApiService';
import {Link} from 'react-router-dom'

const apiService = new ApiService();

export default class Admin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            student:{
                name: 'Alexander',
                surname: 'Tsalapov',
                course: 1,
                status: 'y',
            },
            students:[]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()
        let student = this.state.student
        let value = {
            "name": student.name,
            "surname": student.surname,
            "status": student.status,
            "course": student.course,
        }
        apiService.createStudent(value)
    }
    handleChange(e) {
        // this.setState({...this.state.name,name: e.target.value})
        this.setState(state=>{
            let student = Object.assign({},state.student);
            student[e.target.name] = e.target.value
            return {
                student
            }
        })
        console.log(this.state.student)
    }
    componentDidMount() {
        apiService.getStudents().then(response=> {
            this.setState({students: response.data})
        })
    
    }
    
    render(){
        return(
            <div>
                <h3>Отдел администратора</h3>
                <h4>Список студентов</h4>
                {/* <ul>
                {this.state.students.map((student)=>
                    <li key={student.id}>
                        <p>#{student.id}: {student.name} {student.surname}</p>
                        {apiService.getStatus(student.status)} {student.course} курсе
                        <button className='btn btn-danger' onClick={e => apiService.deleteStudent(student.id)}>Удалить</button>
                        
                    </li>
                )}
                </ul> */}
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Имя</th>
                            <th scope='col'>Фамилия</th>
                            <th scope='col'>Статус</th>
                            <th scope='col'>Курс</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.students.map((student)=>
                           <tr scope='row'>
                               <td>{student.id}</td>
                               <td>{student.name}</td>
                               <td>{student.surname}</td>
                               <td>{student.status}</td>
                               <td>{student.course}</td>
                               <td><button className='btn btn-danger m-3 mt-0 mb-0 mr-0' onClick={e=>apiService.deleteStudent(student.id)}>Удалить</button>
                               <Link className='btn btn-primary' to={'/CreateUpdateStudent/'+student.id}>Изменить</Link></td>
                           </tr> 
                        )}
                    </tbody>
                </table>
                <Link className='btn btn-success' to='/CreateUpdateStudent'>Добавить студента</Link>
            </div>
        )
    }
}