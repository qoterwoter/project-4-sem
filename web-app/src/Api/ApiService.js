import React from 'react'
const URL = 'http://localhost:8000/api';


export default class ApiService extends React.Component {
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
    async getStudents() {
        let url = URL + '/students/'
        const response = await fetch(url, {
            method: "GET", 
            headers: {
                'Authorization':`Token ${sessionStorage.token}`,
            }
        })
        .then((res) => res.json())
        return response
    }

    async getStudent(id) {
        let url = URL + `/students/${id}`;
        return await fetch(url,{
            method:"GET",
            headers: {
                'Authorization':`Token ${sessionStorage.token}`,
            }
        })
        .then((res)=> res.json())
    }

    async deleteStudent(id){
        let url = URL + `/students/${id}`;
        return await fetch(url,{
            method:"DELETE",
            headers: {
                'Authorization':`Token ${sessionStorage.token}`,
            }
        })
    }

    async createStudent(student) {
        let url = URL + `/students/`;
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(student),
            headers: {
                'Content-type':'application/json',
                'Authorization':`Token ${sessionStorage.token}`,
            }
        })
        .then(res=>{console.log(res)})
    }

    async updateStudent(student) {
        let url = URL + `/students/${student.id}`
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(student),
            headers: {
                'Content-type':'application/json',
                'Authorization':`Token ${sessionStorage.token}`,
            }
        })
        .then(res=>{console.log(res)}) 
    }
}