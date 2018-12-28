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
        this.setState((state)=> {
            let newVk = state.vk
            newVk.name =`${data['first_name']} ${data['last_name']}`
            newVk.photo = data['photo']
            newVk.read = true
            console.log('VKOnAuth ', newVk)

            return {...state, vk:newVk}
        })
        console.log('state ', this.state)
    }

  render() {
      console.log('this.state.vk', this.state.vk)
      const login = () => <User vk={this.state.vk}/>;
      const portfolio = () => <Portfolio VKOnAuth={this.VKOnAuth} vk={this.state.vk} />;

    return (
        <section>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li><Link to="/">Portfolio</Link></li>
                            {/*<li><Link to="/login">User</Link></li>*/}

                        </ul>
                    </nav>
                    <h1>Генератор портфолио</h1>
                    <Route path="/" render={portfolio}/>
                    {/*<Route path="/login" render={login}/>*/}
                </div>
            </Router>

        </section>
    );
  }
}

export default App;
