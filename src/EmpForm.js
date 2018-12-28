import React from "react"
import {experience} from "./constants"



export default class EmpForm extends React.Component{
constructor(props){
    super(props)
    this.state={selVal:"", fio:"",age:0,address:"",qual:"", bio:""}
    this.elmOnChange = this.elmOnChange.bind(this)
}
elmOnChange(e){
    console.log(e.target.value)
    var newState = {...this.state};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
    //this.setState({...this.state, selVal: e.target.value});
}

render(){
    return(
        <form action="">
            <input name="fio" placeholder="Введите ФИО" className="" type="text" onChange={this.elmOnChange}></input>
            <input name="age" placeholder="Введите возраст" type="number" onChange={this.elmOnChange}></input>
            <input name="address" placeholder="Введите адрес проживания" type="text" onChange={this.elmOnChange}></input>
            <input name="qual" placeholder="Введите квалификацию" type="text" onChange={this.elmOnChange}></input>
            <label htmlFor="form__select">
            Опыт работы
                <select name="selVal" id="form__select" value={this.state.selVal} onChange={this.elmOnChange}>
                    {experience.map((exp, i)=>{return(<option key={i} value={exp.id}>{exp.text}</option>)})}
                </select>
            </label>
            <textarea name="bio" placeholder="Информация о себе"></textarea>
            <button>Созадть портфолио</button>
        </form>
    )
}
}