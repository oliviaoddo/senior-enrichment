import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { loadCampuses } from "../store";

class Campuses extends Component {
    componentDidMount() {
        this.props.loadCampuses();
      }
    render(){
        return (
                 <h1>Campuses</h1>

            );

    }

}

const mapStateToProps = storeState => ({
  campuses: storeState.campuses
});

const mapDispatchToProps = dispatch => ({
  loadCampuses: () => dispatch(loadCampuses())
});

export default connect(mapStateToProps, mapDispatchToProps)(Campuses);
