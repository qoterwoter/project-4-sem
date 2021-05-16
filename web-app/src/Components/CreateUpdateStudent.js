import React from 'react'
import ApiService from '../Api/ApiService';
import {Link} from 'react-router-dom'
import queryString from 'query-string';

const apiService = new ApiService();

export default class CreateUpdateStudent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            student:{
                name: '',
                surname: '',
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
    handleUpdate(e) {
        apiService.getStudent()
    }
    componentDidMount() {
        let params = queryString.parse(this.props.location.search);
        if(params && params.id) {
            apiService.getStudent(params.id).then((studentreq)=>{
                this.setState({student:studentreq})
            })
        }
    }
    
    render(){
        return(
            <div className='is_superuser'>
            <form className='form-group' onSubmit={this.handleSubmit}>
                <h4>Добавить студента</h4>
                <label for ='name'> Имя:</label>
                <input
                    id='name'
                    className="form-control"
                    name='name'
                    type="text"
                    value={this.state.student.name}
                    onChange={e=>this.handleChange(e)}
                />
                <label for='surname'> Фамилия:</label><input
                    id='surname'
                    className="form-control"
                    name='surname'
                    type="text"
                    value={this.state.student.surname}
                    onChange={e=>this.handleChange(e)}
                />
                <label for='status'> Статус обучения:<br/>(учится/отчислен/выпустился и т.п.)</label>
                {/* <input
                    id='status'
                    className="form-control"
                    name='status'
                    type="text"
                    value={this.state.student.status}
                    onChange={e=>this.handleChange(e)}
                /> */}
                <select 
                id='status'
                className='form-select'
                name='status'
                value={this.state.student.status} 
                onChange={e=>this.handleChange(e)}
                >
                    <option value='y'>Учится</option>
                    <option value='q'>Зачислен</option>
                    <option value='n'>Отчислен</option>
                    <option value='a'>Решается</option>
                </select>
                <label for='course'> Курс:</label>
                <input
                    id='course'
                    className="form-control"
                    name='course'
                    type="text"
                    value={this.state.student.course}
                    onChange={e=>this.handleChange(e)}
                />
                <input className="btn btn-success mt-4" type="submit" value="Сохранить" />
                <Link className='btn btn-primary mt-4 ml-3' to='/Main'>Назад</Link>
            </form>
        </div>
        )
    }
}