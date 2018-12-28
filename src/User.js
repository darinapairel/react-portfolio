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
            vk: {
                name: '',
                photo: '',
                read:false
            }
        }
    }


    gitFetchUser = () => {
        const gitInpVal=document.getElementById('gitInp').value
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
                    console.log(json);

                    return {...state, github: newGithub}
                })

            })
    }

    render(){
        /*
         github info + submit change
        {
                    (this.state.Vk.photo!=="" && this.state.Vk.name!=="" )?
                    <div>
                        <img src={this.state.Vk.photo} alt="user photo"/>
                        <input type="text" defaultValue={this.state.Vk.name} />
                        <DialogWindow childElm={<GitHubAuth gitFetchUser={this.gitFetchUser}/>} btnText={"Добавить github"}/>
                    </div>
                    :
                        <VkAuth VKOnAuth={this.VKOnAuth}/>

                }
                {this.state.github.gitRepos.map((r, i) => { return <a key={i} style={{display: 'block', width: '100%'}} href={r.html_url}>{r.name}</a> })}
                <button onClick={this.props.onSubmitUser}></button>
         */
        return(
            (this.state.vk.photo !== "" && this.state.vk.name !== "") ?
                <div>
                    <img src={this.state.vk.photo} alt="user photo"/>
                    <input type="text" defaultValue={this.state.vk.name}/>
                    <DialogWindow childElm={<GitHubAuth gitFetchUser={this.gitFetchUser}/>}
                                  btnText={"Добавить github"}/>
                </div> :
                <div>Зарегистрироваться</div>
         )
    }

}

