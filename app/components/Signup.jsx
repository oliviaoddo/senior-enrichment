import React, {Component} from 'react';
import { signUserUp } from '../redux/auth';
import { connect } from 'react-redux';


class Signup extends Component{
    constructor(props) {
        super(props);
        this.state ={
            email: '',
            password: '',
            password2: '',
            fname: '',
            lname: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(event.target.pass.value);
        this.props.signup({email: event.target.email.value, password: event.target.pass.value, first_name: event.target.fname.value, last_name: event.target.lname.value})
    }

    render(){
        return(
               <div className = 'container'>
                <h2>Signup</h2>
                    <div className="row">
                    <form className="col s12" onSubmit={this.handleSubmit}>
                      <div className="row">
                       <div className="input-field col s6">
                          <input value={this.state.fname} id="first_name" name='fname' onChange={(event) => this.setState({fname: event.target.value})}  type="text" className="validate"/>
                          <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="input-field col s6">
                          <input value={this.state.lname} id="last_name" name='lname' onChange={(event) => this.setState({lname: event.target.value})}  type="text" className="validate"/>
                          <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className="input-field col s12">
                          <input value={this.state.email} name='email' onChange={(event) => this.setState({email: event.target.value})} id="email" type="email" className="validate"/>
                          <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-field col s12">
                          <input type="password" value={this.state.password} name="pass" onChange={(event) => this.setState({password: event.target.value})} id="password" className="validate"/>
                          <label htmlFor="password">Password</label>
                        </div>

                    <div className="row">
                        <div className="input-field col s12">
                          <input value={this.state.password2} name='password2' onChange={(event) => this.setState({password2: event.target.value})} id="password" type="password" className="validate"/>
                          <label htmlFor="password">Confirm Password</label>
                        </div>
                    </div>
                    <button type='submit' className="btn red">Signup</button>
                    </div>
                    </form>
                  </div>
               </div>

               );
    }

}


const mapDispatchToProps = dispatch => ({
    signup: (user) => dispatch(signUserUp(user))
})

export default connect(null, mapDispatchToProps)(Signup);
