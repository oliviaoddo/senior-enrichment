import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    render(){
        return (
                  <nav>
                    <div className="nav-wrapper  lime lighten-1" >
                    <Link to = "/" className="brand-logo right"><i className="material-icons">assignment</i></Link>
                      <ul className="left hide-on-med-and-down">
                        <li> <Link to = "/campuses">Campuses
                        </Link></li>
                        <li><Link to= "/students">Students
                        </Link></li>
                      </ul>
                    </div>
                  </nav>

            );

    }

}
