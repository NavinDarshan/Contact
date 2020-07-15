import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";


import history from './history';
import Login from './Forms/Login'
import Signup from './Forms/Signup'
import User from './Forms/user'
import Home from './Forms/Home'
export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path = "/" exact component={Home}/>
                    <Route path="/login" component={Login} />
                    <Route path='/signup'component={Signup} />
                    <Route path ='/user' component={User} />
                </Switch>
            </Router>
        )
    }
}
