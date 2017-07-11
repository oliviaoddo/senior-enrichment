import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from "react-redux";

function Students(props) {
      console.log("props", props)
      return (
              <div className='container'>
              <h1>Students</h1>
               <table>
                  <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Campus</th>
                    </tr>
                  </thead>

                  <tbody>
                      {
                        props.students.length ?
                        props.students.map(student => {
                        return (
                                  <tr key={student.id}>
                                    <td>{student.first_name} {student.last_name}</td>
                                    <td>{student.email}</td>
                                    <td>{props.campuses.filter(campus => campus.id === student.campusId)[0].name}</td>
                                  </tr>
                                )
                        })
                        :  null

                    }
                  </tbody>
                </table>
              </div>
          )


}


const mapStateToProps = state => ({
  students: state.students,
  campuses: state.campuses
});


export default connect(mapStateToProps)(Students);
