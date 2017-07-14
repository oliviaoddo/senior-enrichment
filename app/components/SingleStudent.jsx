import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchStudent, updateStudent, deleteStudent } from '../store';
import { connect } from 'react-redux';
import {Input} from 'react-materialize'

class SingleStudent extends Component{
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      lastName: '',
      firstName: '',
      email: '',
      selectedCampus: ''
    }
  }
    componentDidMount() {
        const studentId = this.props.match.params.id
        this.props.fetchStudent(studentId)
        .then(() =>{
          console.log("props in promise", this.props)
          this.setState({
            firstName: this.props.student.first_name,
            lastName: this.props.student.last_name,
            email: this.props.student.email,
            selectedCampus: this.props.student.campusId
           })
        })
        console.log("props in mount", this.props);
    }
    render(){
        return (
                    <div className='container'>
                        <h1>{this.props.student.first_name} {this.props.student.last_name}</h1>
                        <div className="row">
                            <div className="col m6">
                                <h2>{this.props.student.email}</h2>
                                <label>Edit</label>
                                <form onSubmit={this.props.handleSubmit} className="col s12" >
                                 <div className="input-field inline">
                                        <input onChange={(event) => this.setState({firstName: event.target.value})} name="firstName" value={this.state.firstName.charAt(0).toUpperCase() + this.state.firstName.slice(1)}/>
                                </div>
                                <div className="input-field inline">
                                        <input onChange={(event) => this.setState({lastName: event.target.value})} name="lastName" value={this.state.lastName.charAt(0).toUpperCase() + this.state.lastName.slice(1)}/>
                                </div>
                                <div className="input-field inline">
                                        <input onChange={(event) => this.setState({email: event.target.value})} name="email"value={this.state.email}/>
                                </div>
                                <div className="input-field inline">
                                  <Input onChange={(event) => this.setState({selectedCampus: event.target.value})}  s={10} type='select' value={this.state.selectedCampus}name="campusType">
                                     {
                                      this.props.campuses.map(campus => {
                                        return <option key={campus.id} value={campus.id}>{campus.name}</option>
                                      })
                                   }
                                  </Input>
                                </div>
                                <div className="input-field inline">
                                    <button type="submit" className="btn-floating btn-small waves-effect waves-light teal"><i className='material-icons'>check</i></button>
                                </div>
                                <div className="input-field inline">
                                    <button onClick={this.props.removeStudent} className="btn-floating btn-small waves-effect waves-light teal"><i className='material-icons'>delete</i></button>
                                </div>
                              </form>
                              </div>
                             <div className="col m6">
                            {
                                this.props.campuses.filter(campus => campus.id === this.props.student.campusId)
                                .map(campus => {
                                    return (
                                             <div key={campus.id} className="card">
                                              <div className="card-image waves-effect waves-block waves-light">
                                              <img className="activator" src="http://www.everythinglongbeach.com/wp-content/uploads/2014/01/csulb.jpg"></img>
                                            </div>
                                            <div className="card-content">
                                              <span className="card-title activator grey-text text-darken-4">
                                              {campus.name}</span>
                                              <p><Link to={`/campus/${campus.id}`}>View Campus</Link></p>
                                            </div>
                                          </div>
                                        )
                                })
                            }
                        </div>

                    </div>
                    </div>
                )
    }
}


const mapStateToProps = (state) => ({
  campuses: state.campuses,
  student: state.student

})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchStudent: (studentId) => dispatch(fetchStudent(studentId)),
  handleSubmit(event){
    const fnameInput = event.target.firstName.value
    const lnameInput = event.target.lastName.value
    event.preventDefault()
    dispatch(updateStudent({firstName: fnameInput.charAt(0).toUpperCase() + fnameInput.slice(1) , lastName: lnameInput.charAt(0).toUpperCase() + lnameInput.slice(1), email: event.target.email.value, campusId: event.target.campusType.value}, ownProps.match.params.id))
  },
  removeStudent(event){
    event.preventDefault();
    dispatch(deleteStudent(ownProps.match.params.id, ownProps.history));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent)
