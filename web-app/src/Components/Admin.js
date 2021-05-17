import React from 'react'
import ApiService from '../Api/ApiService';
import {Link} from 'react-router-dom'

const apiService = new ApiService();
const link = 'students'
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
        apiService.createData(value,link)
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
        apiService.getDatas(link).then(response=> {
            this.setState({students: response.data})
        })
    }
    handleSort(e) {
        this.state.students.sort()
    }
    render(){
        return(
            <div className='admin'>
                <h3 className='admin__title'>Отдел администратора</h3>
                <div className='table__description'>
                    <h4 className='table__title'>Список студентов</h4>
                    <Link className='admin__button' to='/CreateUpdateStudent'>Добавить студента</Link>
                </div>
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
                               <td><button className='table__delete' onClick={e=>apiService.deleteData(student.id,link)}>Удалить</button>
                               <Link className='table__update' to={'/CreateUpdateStudent/?id='+student.id}>Изменить</Link></td>
                           </tr> 
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}