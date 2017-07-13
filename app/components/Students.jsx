import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from "react-redux";
import {Input} from 'react-materialize'

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      selectedCampus: ''
    }
  }
  render(){
      return (
              <div>
              <div className='container'>
              <h1>Students</h1>
              <form onSubmit={this.props.submit}>
               <table className='striped responsive-table'>
                  <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Campus</th>
                        <th></th>
                    </tr>
                  </thead>

                <tbody>
                      <tr>

                              <td><input value={this.state.firstName} name="firstName" onChange={(event) => this.setState(firstName: event.target.value )}></input></td>
                              <td><input value={this.state.lastName} name="lastName" onChange={(event) => this.setState(lastName: event.target.value )} ></input></td>
                              <td><input value={this.state.email} name="email" onChange={(event) => this.setState(email: event.target.value )} ></input></td>
                              <td>
                                  <Input s={10} type='select' defaultValue=''>
                                   <option value="" disabled selected>Select a Campus</option>
                                     {
                                      this.props.campuses.map(campus => {
                                        return <option key={campus.id} value={campus.id}>{campus.name}</option>
                                      })
                                   }
                                  </Input>

                              </td>
                              <td><button type="submit" className="btn-floating btn-small waves-effect waves-light teal"><i className='material-icons'>add</i></button></td>

                      </tr>
                      {
                        this.props.students.length ?
                        this.props.students.map(student => {
                        return (
                                  <tr key={student.id}>
                                    <td>{student.first_name} </td>
                                    <td>{student.last_name}</td>
                                    <td>{student.email}</td>
                                    <td>{this.props.campuses.filter(campus => campus.id === student.campusId)[0].name}</td>
                                    <td><Link to={`student/${student.id}`}><i className="material-icons">visibility</i></Link></td>
                                  </tr>
                                )
                        })
                        :  null

                    }
                  </tbody>
                </table>
                </form>
              </div>
              </div>
          )
    }

}


const mapStateToProps = state => ({
  students: state.students,
  campuses: state.campuses
});


export default connect(mapStateToProps)(Students);
