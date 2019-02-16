import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css'
import Portfolio from './Portfolio'
import User from './User'
import DialogWindow from "./DialogWindow";

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            vk: {
                name: '',
                photo: '',
                read:false
            }
        }
    }

    VKOnAuth = (data) => {
        let newVk = {...this.state.vk};
       
        newVk.name =`${data['first_name']} ${data['last_name']}`;
        newVk.photo = data['photo'];
        newVk.read = true;

        this.setState({...this.state, vk: newVk});
        console.log('state ', this.state)
    }

  render() {


      const portfolio = () => <Portfolio VKOnAuth={this.VKOnAuth} vk={this.state.vk} />;

    return (
        <section>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li><Link to="/">Portfolio</Link></li>
                        </ul>
                    </nav>
                    <h1>Генератор портфолио</h1>
                    <Route path="/" render={portfolio}/>
                </div>
            </Router>

        </section>
    );
  }
}

export default App;
