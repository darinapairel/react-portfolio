import React from 'react'
import {VkAuth} from './VkAuth'
import DialogWindow from './DialogWindow'
import GitHubAuth from './GitHubAuth'

export default class User extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            github: {
                gitLogin: '',
                gitBio: '',
                read: false,
                gitRepos: []
            },
        }
        console.log('props', props)
    }


    gitFetchUser = () => {
        const gitInpVal = document.getElementById('gitInp').value
        ![undefined, ''].includes(gitInpVal) ?
            //проверка на то, существует ли пользователь
            fetch(`https://api.github.com/users/${gitInpVal}`)
                .then(res=>res.json())
                .then(json => this.setState((state) => {
                    let newGithub = state.github

                    newGithub.gitLogin = json.login
                    newGithub.gitBio = json.bio
                    newGithub.read = true

                    return {...state, github: newGithub}
                })):
            console.log('nothing to fetch')
        // загрузка репозиториев
        fetch(`https://api.github.com/users/${gitInpVal}/repos`)
            .then(res => res.json())
            .then((json) => {
                this.setState((state) => {
                    let newGithub = state.github

                    newGithub.gitRepos = json

                    return {...state, github: newGithub}
                })

            })
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState({ vk: nextProps.vk });
    }
    render(){
        if (this.props.vk !== undefined)
            return(
                (this.props.vk.photo !== "" && this.props.vk.name !== "") ?
                    <div>
                        <img src={this.props.vk.photo} alt="user photo"/>
                        <input type="text" defaultValue={this.props.vk.name}/>
                        {
                            this.state.github.read === true ?
                            this.state.github.gitRepos.map((r, i) => {
                                return <a key={i} style={{display: 'block', width: '100%'}} href={r.html_url}>{r.name}</a>
                            })
                            :<DialogWindow childElm={<GitHubAuth gitFetchUser={this.gitFetchUser}/>}
                                           btnText={"Добавить github"}/>
                        }
                        <button onClick={this.props.onSubmitUser}></button>
                    </div> :
                    <div>Зарегистрироваться</div>
            )
        else 
            return null;
    }

}

