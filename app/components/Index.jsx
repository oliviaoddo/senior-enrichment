import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Students from './Students';
import Campuses from './Campuses';
import Navigation from './Navigation';
import Home from './Home';


export default class Main extends Component{
    render(){
        return(
                <Router>
                    <div>
                    <Navigation/>
                    <Switch>
                        <Route exact path={`/`} component={Home} />
                        <Route exact path={`/students`} component={Students} />
                        <Route exact path={`/campuses`} component={Campuses} />
                    </Switch>
                    </div>
                </Router>
               )
    }
}

