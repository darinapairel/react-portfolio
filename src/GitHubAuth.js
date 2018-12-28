import React from 'react'

export default class GitHubAuth extends React.Component{


    render(){
        return(
            <div>
                <input id="gitInp" type="text" placeholder="введите Ваш логин github" defaultValue={"darinamandarina"}/>
                <button onClick={this.props.gitFetchUser}>Добавить</button>
            </div>
    )
    }
}