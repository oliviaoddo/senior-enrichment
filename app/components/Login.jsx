import React, {Component} from 'react';
import { logUserIn } from '../redux/auth';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Login extends Component{
    constructor(props) {
        super(props);
        this.state ={
            email: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.login({email: event.target.email.value, password: event.target.password.value})
    }

    render(){
        return(
               <div className = 'container'>
                <h2>Login</h2>
                    <div className="row">
                    <form className="col s6" onSubmit={this.handleSubmit}>
                      <div className="row">
                        <div className="input-field col s12">
                          <input value={this.state.email} name='email' onChange={(event) => this.setState({email: event.target.value})} id="email" type="email" className="validate"/>
                          <label htmlFor="email">Email</label>
                        </div>
                      </div>
                    <div className="row">
                        <div className="input-field col s12">
                          <input value={this.state.password} name='password' onChange={(event) => this.setState({password: event.target.value})} id="password" type="password" className="validate"/>
                          <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <button type='submit' className="btn red">Login</button>
                    </form>
                    <div className="col s6">
                        <a target='-self' href='/api/auth/google'> <button className="btn red"><i className="fa fa-google-plus" aria-hidden="true"></i> Login with Google</button></a>
                    </div>
                  </div>
               </div>

               );
    }

}


const mapDispatchToProps = dispatch => ({
    login: (user) => dispatch(logUserIn(user))
})

export default connect(null, mapDispatchToProps)(Login);
