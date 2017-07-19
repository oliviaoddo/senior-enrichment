import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logUserOut } from '../redux/auth';
import { connect } from 'react-redux';

class Navigation extends Component {
    render(){
        return (
                  <nav>
                    <div className="nav-wrapper  lime lighten-1" >
                    <Link to = "/" className="brand-logo right"><i className="material-icons">assignment</i></Link>
                      <ul className="left hide-on-med-and-down">
                        <li> <Link to = "/campuses">Campuses
                        </Link></li>
                        { this.props.currentUser ? <li><Link to= "/students">Students
                        </Link></li> : null}
                        { this.props.currentUser ? this.renderLogout() : this.renderLoginSignup() }
                        { this.props.currentUser ? <li>{this.props.currentUser.first_name}</li> : <li>no user</li> }
                      </ul>
                    </div>
                  </nav>

            );

    }

    renderLoginSignup() {
      return (
            // <li><Link to= "/login">Login</Link></li>
            <li><Link to= "/signup">Signup</Link></li>
      );
    }

    renderLogout() {
      return (
          <li>
          <button
            className="btn"
            onClick={this.props.logout}>
            logout
          </button>
          </li>
      );
    }

}


const mapStatToProps = state => ({ currentUser: state.auth.currentUser})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logUserOut())
})

export default connect(mapStatToProps, mapDispatchToProps)(Navigation);

