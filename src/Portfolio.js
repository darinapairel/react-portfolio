import React from "react"
import DialogWindow from "./DialogWindow";
import User from "./User"
import VkAuth from './VkAuth'
import styled from 'styled-components';

export default class Portfolio extends React.Component{
    constructor(props){
        super(props)
        this.state = {fetching: false, selVal: "1", fio: "Дарина Яковлевна Паирель", age: 21, address: "Спб, Россия", qual: "студент", bio: "Интересуюсь веб разработкой"}
        this.renderPortfolio = this.renderPortfolio.bind(this)
    }

    componentDidMount(){
        
        fetch("test.json")
            .then(response =>response.json())
            .then(json=> {
                this.setState({...json, fetching: false});
                console.log('json()', json);
            }).catch((e)=>console.log(e))
        
    }

    renderPortfolio(){

        const Home = ({info}) => <p>{`Я${info.fio},
                            мой возраст ${info.age}
                            Я живу в ${info.address}.
                            Моя квалификация: ${info.qual}`}
                        </p>
        const StyledHome = styled(Home)`
            white-space: pre-line;          
        `

        return(
            <div>
                <DialogWindow childElm={<User vk = {this.props.vk} onSubmitUser={this.onSubmitUser()}/>} btnText="Редактировать"/>
                <nav>
                    <ul>
                        <a href="#home"><li>Главная</li></a>
                        <a href="#about"><li>Обо мне</li></a>
                        <a href="#contact"><li>Контакты</li></a>
                    </ul>
                </nav>
                <section id="home">
                    <h1>Hello</h1>
                    <div className="home__info">
                        <StyledHome info={this.state}></StyledHome>
                    </div>
                </section>
                <section id="about">
                    <h1>About</h1>
                    <div className="about__info">
                        {this.state.bio}
                    </div>
                </section>
                <section id="contact">
                    <h1>Contact</h1>
                </section>
               </div>
        )
        
    }

    onSubmitUser = () => {

    }

    render(){
        return (
            <div>
                {!this.props.vk.read ?
                    <DialogWindow childElm={<VkAuth VKOnAuth={this.props.VKOnAuth}/>} btnText={"Создать портфолио"}/>
                    :
                    this.renderPortfolio()
                }

            </div>
        )
        
    }

}