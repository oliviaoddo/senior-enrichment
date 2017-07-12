import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { changeCampus, postCampus } from '../store'

function Campuses(props) {
      return (
    <div className="container">
    <h1>Campuses</h1>
    <div className="row">
    <form className="col s12 right-align" onSubmit={props.handleSubmit} >
     <div className="input-field inline">
            <input name="campusName"onChange={props.handleChange} value={props.newEntry} id="campus-name" placeholder="Campus Name"/>
    </div>
    <div className="file-field input-field inline">
      <div className="btn">
        <span>File</span>
        <input type="file"/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
    <div className="file-field input-field inline">
        <button type="submit" className="btn-floating btn-small waves-effect waves-light teal"><i className='material-icons'>add</i></button>
    </div>
  </form>
  </div>
    <div className="row">
    {
      props.campuses.map(campus => {
        return (
                <div key={campus.id} className="col m4">
                 <div className="card">
                  <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src={campus.image}></img>
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">
                  {campus.name}<i className="material-icons right">more_vert</i></span>
                  <p><Link to={`/campus/${campus.id}`}>View Campus</Link></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                  <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
              </div>
              </div>
                )
      })
    }
    </div>
    </div>

      )


}

const mapStateToProps = state => ({
  campuses: state.campuses,
  newEntry: state.newCampusEntry
});

const mapDispatchToProps = dispatch => ({
  handleChange(event){
    dispatch(changeCampus(event.target.value))

  },
  handleSubmit(event){
    event.preventDefault();
    dispatch(postCampus({name: event.target.campusName.value, image: 'img.jpg'}))
    dispatch(changeCampus(''));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Campuses);
