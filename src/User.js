import React from 'react'

// components import
import {VkAuth} from './VkAuth'

// material-ui imports
import ButtonBase from '@material-ui/core/ButtonBase'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import FilledInput from '@material-ui/core/FilledInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import theme from './theme.js'


class User extends React.Component{
    constructor(props) {
        super(props)
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(){
        this.props.onSubmitUser({
            VKname: document.getElementsByClassName("user_inp__name")[0].firstElementChild.value,
            gitLogin: document.getElementsByClassName("user_inp__gitLogin")[0].firstElementChild.value,
            age: Number(document.getElementsByClassName("user_inp__age")[0].firstElementChild.value),
            address: document.getElementsByClassName("user_inp__address")[0].firstElementChild.value,
            qual: document.getElementsByClassName("user_inp__qual")[0].firstElementChild.value,
        })
    }

    deleteUserInfo(){
        localStorage.removeItem("name");
        localStorage.removeItem("read");
        localStorage.removeItem("photo");
        localStorage.removeItem("age");
        localStorage.removeItem("address");
        localStorage.removeItem("qual");
        localStorage.removeItem("gitBio");
        localStorage.removeItem("gitRepos");
        localStorage.removeItem("gitLogin");


        document.getElementsByClassName("saveBtn")[0].disabled = true;
    }
    render() {
        if (this.props.vk !== undefined)
            return (
                // (this.props.vk.photo !== "" && this.props.vk.name !== "" ) ?
                    <Grid container className={this.props.classes.grid}>
                        <Grid item xs={5}>
                            <Avatar src={this.props.vk.photo} className={this.props.classes.bigAvatar} alt="user photo"/>
                        </Grid>
                        <Grid item xs={7}>
                            <Grid container direction={"column"}>
                                <InputBase type="text" className={`${this.props.classes.text} user_inp__name`}  defaultValue={ this.props.vk.name }/>
                                <Grid item xs={12}>
                                    <InputBase className={`user_inp__gitLogin ${this.props.classes.text}`} type="text" placeholder="введите Ваш логин github" defaultValue={this.props.github.gitLogin}/>
                                    <ButtonBase className={this.props.classes.text} onClick={this.props.gitFetchUser}>{(!this.props.github.read)?"Добавить":"Изменить"}</ButtonBase>
                                </Grid>
                                <InputBase type="number" className={`user_inp__age ${this.props.classes.text}`} defaultValue={this.props.data.age}/>
                                <InputBase type="text" className={`user_inp__address ${this.props.classes.text}`} defaultValue={this.props.data.address}/>
                                <InputBase type="text" className={`user_inp__qual ${this.props.classes.text}`} defaultValue={  this.props.data.qual }/>
                            </Grid>
                        </Grid>
                        <Grid item xs={5}>
                            <ButtonBase className={`${this.props.classes.text} saveBtn`} onClick={this.handleSave}>Сохранить</ButtonBase>
                            <ButtonBase className={this.props.classes.text} onClick={this.deleteUserInfo}>Удалить портфолио</ButtonBase>
                        </Grid>
                    </Grid>
                    // :
                    // <div>Зарегистрироваться</div>
            )
        else
            return null;
    }
}

export default withStyles(theme)(User)

