import React from 'react'
const URL = 'http://localhost:8000/api';


export default class ApiService extends React.Component {

    async getStudents() {
        let url = URL + '/students/'
        const response = await fetch(url, {
            method: "GET", 
            headers: {
                'Authorization':`Token ${sessionStorage.token}`,
            }
        })
        .then((res) => res.json())
        // const response = await axios.get(url, {
        //     headers: {
        //         'token':'81f6d7e7a1f4533a1d156d103657b323fe6b922b'
        //     }
        // })
        // .then(res => res.data)
        return response
    }
    getStudent(id) {
        let url = URL + `/students/${id}`;
        return fetch(url)
        .then((res)=> res.json())
    }
}