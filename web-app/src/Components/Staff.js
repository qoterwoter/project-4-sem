import React from 'react';
import ApiService from '../Api/ApiService'

const link = 'news';
const apiService = new ApiService();

export default class Staff extends React.Component { 

    constructor(props) {
        super(props)

        this.state={
            news:[]
        }
    }

    componentDidMount() {
        apiService.getDatas(link).then(response=>{
            this.setState({news:response.data})
            console.log(response.data)
        })
    }
    
    render(){
    return(
        <div className='staff'>
            <h1 className='staff__title'>Отдел персонала</h1>
            <div className='news'>
                {this.state.news.map((newz)=>
                    <div className='news__block'>
                        <h4>{newz.title}</h4>
                        <p>{newz.description}</p>
                        <p>Автор: <i>{newz.user}</i></p>
                    </div>
                )}
            </div>
        </div>
    )}
}