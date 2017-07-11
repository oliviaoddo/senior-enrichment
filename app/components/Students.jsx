import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { loadStudents } from "../store";

class Students extends Component {
   componentDidMount() {
      this.props.loadStudents();
    }

    render(){
        return (
                  <h1>Students</h1>

            );

    }

}


const mapStateToProps = storeState => ({
  students: storeState.students
});

const mapDispatchToProps = dispatch => ({
  loadStudents: () => dispatch(loadStudents())
});

export default connect(mapStateToProps, mapDispatchToProps)(Students);
