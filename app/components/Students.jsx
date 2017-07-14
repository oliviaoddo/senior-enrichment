import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from "react-redux";
import {Input} from 'react-materialize'
import { postStudent, deleteStudent } from '../store';

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      selectedCampus: '',
      students: [],
      searchValue: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      students: nextProps.students
    });
  }

  componentDidMount() {
    this.setState({
      students: this.props.students
    });
  }



  handleChange(event){
    const input = event.target.value;
    const cammelCaseInput = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    this.setState( {searchValue: cammelCaseInput})
  }

  render(){
      const students = this.state.students.filter(student =>  student.first_name.match(this.state.searchValue) || student.last_name.match(this.state.searchValue) || student.first_name.concat(' ').concat(student.last_name).match(this.state.searchValue))
      return (
              <div className='container'>
              <h1>Students</h1>

              <div className="row">
                <div className="col s12">
                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix">search</i>
                      <input onChange={this.handleChange} type="text" id="student-input" className="autocomplete"></input>
                      <label htmlFor="student-input">Search for a Student</label>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={this.handleSubmit}>
               <table className='striped responsive-table'>
                  <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Campus</th>
                        <th></th>
                        <th></th>
                    </tr>
                  </thead>

                <tbody>
                    { !this.state.searchValue ?
                      <tr>

                              <td><input value={this.state.firstName} placeholder="Add a Student" name="firstName" onChange={(event) => this.setState({firstName: event.target.value} )} required></input></td>
                              <td><input value={this.state.lastName} name="lastName" onChange={(event) => this.setState({lastName: event.target.value })} required></input></td>
                              <td><input value={this.state.email} name="email" onChange={(event) => this.setState({email: event.target.value} )}  type="email" required></input></td>
                              <td>
                                  <Input s={10} type='select' defaultValue='' name="campusType" required>
                                   <option value="" disabled>Select a Campus</option>
                                     {
                                      this.props.campuses.map(campus => {
                                        return <option key={campus.id} value={campus.id}>{campus.name}</option>
                                      })
                                   }
                                  </Input>

                              </td>
                              <td><button type="submit" className="btn-floating btn-small waves-effect waves-light teal"><i className='material-icons'>add</i></button></td>
                              <td></td>

                      </tr>
                      : null
                    }
                      {
                        this.props.campuses.length ?
                        students.map(student => {
                        return (
                                  <tr key={student.id}>
                                    <td>{student.first_name} </td>
                                    <td>{student.last_name}</td>
                                    <td>{student.email}</td>
                                    <td>{this.props.campuses.filter(campus => campus.id === student.campusId)[0].name}</td>
                                    <td><Link to={`student/${student.id}`}><i className="material-icons">visibility</i></Link></td>
                                    <td><i id={student.id} onClick={this.handleDelete} className="fa fa-times-circle fa-lg icon-delete" aria-hidden="true"></i></td>
                                  </tr>
                                )
                        })
                        :  null

                    }
                  </tbody>
                </table>
                </form>
              </div>
          )
    }

    handleDelete(event){
        console.log(event.target.id)
        this.props.removeStudent(event.target.id);
    }

    handleSubmit(event){
      const fnameInput = event.target.firstName.value
      const lnameInput = event.target.lastName.value
      event.preventDefault();
      this.props.submitStudent({firstName: fnameInput.charAt(0).toUpperCase() + fnameInput.slice(1) , lastName: lnameInput.charAt(0).toUpperCase() + lnameInput.slice(1), email: event.target.email.value , campusId: event.target.campusType.value});
      this.setState({firstName: '', lastName: '', email: '', selectedCampus: ''});
  }


}

const mapStateToProps = state => ({
  students: state.students,
  campuses: state.campuses
});

const mapDispatchToProps = (dispatch,ownProps) => ({
  submitStudent: (student) => dispatch(postStudent(student)),
  removeStudent: (id) => dispatch(deleteStudent(id, ownProps.history))
})


export default connect(mapStateToProps, mapDispatchToProps)(Students);
