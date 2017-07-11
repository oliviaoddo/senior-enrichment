import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from "react-redux";

function Campuses(props) {
      return (
    <div className="container">
    <h1>Campuses</h1>
    {
      props.campuses.map(campus => {
        return (
                 <div className="card">
                  <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src="img.jpg"></img>
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">{campus.name}<i className="material-icons right">more_vert</i></span>
                  <p><a href="#">View Students</a></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                  <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
              </div>
                )
      })
    }
    </div>

      )


}

const mapStateToProps = state => ({
  campuses: state.campuses
});


export default connect(mapStateToProps)(Campuses);
