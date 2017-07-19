import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Students from './Students';
import Campuses from './Campuses';
import Navigation from './Navigation';
import Footer from './Footer';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import store from "../store";
import { fetchStudents } from '../redux/students'
import { fetchCampuses } from '../redux/campuses'
import { retrieveLoggedInUser } from '../redux/auth'



export default class Main extends Component{
    componentDidMount () {
        const studentsThunk = fetchStudents();
        const campusesThunk = fetchCampuses();
        store.dispatch(studentsThunk);
        store.dispatch(campusesThunk);
        store.dispatch(retrieveLoggedInUser());
    }

    render(){
        return(
                <Router>
                    <div>
                        <Navigation/>
                        <Switch>
                            <Route exact path={`/`} component={Home} />
                            <Route exact path={`/students`} component={Students} />
                            <Route exact path={`/campuses`} component={Campuses} />
                            <Route exact path={`/student/:id`} component={SingleStudent} />
                            <Route exact path={`/campus/:id`} component={SingleCampus} />
                            <Route exact path={'/login'} component={Login} />
                            <Route exact path={'/signup'} component={Signup} />
                        </Switch>
                        <Footer />
                    </div>
                </Router>
               )
    }
}

