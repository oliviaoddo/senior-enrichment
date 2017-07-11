import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { loadStudents } from "../store";

class Students extends Component {
   componentDidMount() {
      this.props.loadStudents();
    }

    render(){
      console.log("props", this.props)
        return (
                <div>
                {
                  this.props.students.length ?
                  this.props.students.map(el => {
                    return <h1>{el.first_name}</h1>
                   })
                    :  <div class="progress">
                        <div class="indeterminate"></div>
                      </div>

                }
                </div>

            )

    }

}


const mapStateToProps = storeState => ({
  students: storeState.students
});

const mapDispatchToProps = dispatch => ({
  loadStudents: () => dispatch(loadStudents())
});

export default connect(mapStateToProps, mapDispatchToProps)(Students);
