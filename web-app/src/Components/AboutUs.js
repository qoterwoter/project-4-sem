import React from 'react'
import '../Styles/Style.css'

export default class AboutUs extends React.Component {

    logout = event => {
        event.preventDefault();
        this.props.setLogged(false)
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('is_staff')
        localStorage.removeItem('is_superuser')
        this.props.history.push("/");
    }

    render() {
            
        const bootstrap = <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
        
        return(
        <div className='container'>
            {bootstrap}
            <h2>О нас</h2>
            <p>
            Храните все наиболее интересные факты из жизни, ведите резюме, записные книжки, блоги, составляйте планы и прочее. 
            Соберите в личном пространстве файлы, коллекции рисунков, графиков, чертежей, схем, проектов и творческих работ 
            (фотографий событий, поделок, собранных моделей) в текстовом, графическом, мультимедийном формате; коллекции текстовых файлов, ссылок, презентаций и фотографий,
            видео и анимационных роликов; оцифрованную коллекцию грамот, дипломов, свидетельств, сертификатов, лицензий и прочих документов; рекомендации, комментарии,
            сообщения и советы друзей и педагогов.
            </p>
            <img src='/src/Images/background.jpg'></img>
        </div>
    )}
}