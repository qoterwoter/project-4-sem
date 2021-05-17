import React from 'react'
import ApiService from '../Api/ApiService';
import {Link} from 'react-router-dom'
import queryString from 'query-string';
import { withRouter } from 'react-router-dom'

const apiService = new ApiService();

class CreateUpdateStudent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            student:{
                name: '',
                surname: '',
                course: 1,
                status: 'y',
            },
            students:[],
            params: queryString.parse(this.props.location.search)
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCreate() {
        let student = this.state.student
        let value = {
            "name": student.name,
            "surname": student.surname,
            "status": student.status,
            "course": student.course,
        }
        apiService.createStudent(value)
        this.props.history.push("/Main")
    }

    handleSubmit(event) {
        let params = this.state.params;
        event.preventDefault()
        if(params&&params.id) {
            this.handleUpdate(params.id)
        } else {
            this.handleCreate();
        }
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
        console.log(apiService.getStudent(e))
        this.props.history.push("/Main")
        apiService.updateStudent(this.state.student)
    }
    componentDidMount() {
        let params = this.state.params;
        if(params && params.id) {
            apiService.getStudent(params.id).then((studentreq)=>{
                this.setState({student:studentreq})
            })
        }
    }
    
    render(){
        return(
            <form className='createUpdateForm' onSubmit={this.handleSubmit}>
                <h4 className='createUpdateForm__title'>Добавить студента</h4>
                <label className='createUpdateForm__label' for ='name'> Имя:</label>
                <input
                    id='name'
                    className="createUpdateForm__input"
                    name='name'
                    type="text"
                    value={this.state.student.name}
                    onChange={e=>this.handleChange(e)}
                />
                <label className='createUpdateForm__label' for='surname'> Фамилия:</label><input
                    id='surname'
                    className="createUpdateForm__input"
                    name='surname'
                    type="text"
                    value={this.state.student.surname}
                    onChange={e=>this.handleChange(e)}
                />
                <label className='createUpdateForm__label' for='status'> Статус обучения:<br/>(учится/отчислен/выпустился и т.п.)</label>
                <select 
                    id='status'
                    className='createUpdateForm__select'
                    name='status'
                    value={this.state.student.status} 
                    onChange={e=>this.handleChange(e)}
                >
                    <option value='y'>Учится</option>
                    <option value='q'>Зачислен</option>
                    <option value='n'>Отчислен</option>
                    <option value='a'>Решается</option>
                </select>
                <label className='createUpdateForm__label' for='course'> Курс:</label>
                <input
                    id='course'
                    className="createUpdateForm__input"
                    name='course'
                    type="text"
                    value={this.state.student.course}
                    onChange={e=>this.handleChange(e)}
                />
                <div className='createUpdateForm__buttons'>
                    <input className="createUpdateForm__button button__save" type="submit" value="Сохранить" />
                    <Link className='createUpdateForm__button button__back' to='/Main'>Назад</Link>
                </div>
            </form>
        )
    }
}


const CreateUpdateStudentWithRouter = withRouter(CreateUpdateStudent)
export default CreateUpdateStudentWithRouter