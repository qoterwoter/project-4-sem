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
    handleSort(e) {
        this.state.students.name.sort()
    }
    render(){
        return(
            <table className='table'>
                <thead className='table__head'>
                    <tr className='table__row'>
                        <th onClick={()=>this.handleSort('id')} scope='col'>#</th>
                        <th scope='col'>Имя</th>
                        <th scope='col'>Фамилия</th>
                        <th scope='col'>Статус</th>
                        <th scope='col'>Курс</th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody className='table__body'>
                    {this.state.students.map((student)=>
                        <tr className='table__row' scope='row'>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.surname}</td>
                            <td>{apiService.getStatus(student.status)}</td>
                            <td>{student.course}</td>
                            <td><button className='table__delete' onClick={e=>apiService.deleteStudent(student.id)}>Удалить</button>
                            <Link className='table__update' to={'/CreateUpdateStudent/?id='+student.id}>Изменить</Link></td>
                        </tr> 
                    )}
                </tbody>
            </table>
        )
    }
}