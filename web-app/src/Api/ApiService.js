import React from 'react'
const URL = 'http://project-4-sem.std-962.ist.mospolytech.ru';


export default class ApiService extends React.Component {
    getStatus(status,postfix, secondpostfix,about) {
        let outStat;
        switch(status) {
            case 'q':
                outStat = `Зачислен ${postfix}`
                break
            case `y`:
                outStat = `Учится ${postfix}`
                break
            case `a`:
                outStat = `Решается ${about}`
                break
            case `n`:
                outStat = `Отчислен ${secondpostfix}`
                break
            default:
                break
        }
        return outStat
    }
    async getDatas(link) {
        let url = URL + `/${link}/`
        const response = await fetch(url, {
            method: "GET", 
            headers: {
                'Authorization':`Token ${localStorage.token}`,
            }
        })
        .then((res) => res.json())
        return response
    }

    async getData(id,link) {
        let url = URL + `/${link}/${id}`;
        return await fetch(url,{
            method:"GET",
            headers: {
                'Authorization':`Token ${localStorage.token}`,
            }
        })
        .then((res)=> res.json())
    }

    async deleteData(id,link){
        let url = URL + `/${link}/${id}`;
        return await fetch(url,{
            method:"DELETE",
            headers: {
                'Authorization':`Token ${localStorage.token}`,
            }
        })
    }

    async createData(student,link) {
        let url = URL + `/${link}/`;
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(student),
            headers: {
                'Content-type':'application/json',
                'Authorization':`Token ${localStorage.token}`,
            }
        })
        .then(res=>{console.log(res)})
    }

    async updateData(student,link) {
        let url = URL + `/${link}/${student.id}`
        return fetch(url, {
            method: 'PUT',
            body: JSON.stringify(student),
            headers: {
                'Content-type':'application/json',
                'Authorization':`Token ${localStorage.token}`,
            }
        })
        .then(res=>{console.log(res)}) 
    }
}