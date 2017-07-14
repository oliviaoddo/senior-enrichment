import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { changeCampus, postCampus } from '../store'

class Campuses extends Component{
  constructor(props) {
    super(props);
    this.state = {
      campusEntry: '',
      campuses: [],
      searchValue: '',
      imageEntry: ''
    }
    this.submitCampus = this.submitCampus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      campuses: nextProps.campuses
    });
  }

  componentDidMount() {
    this.setState({
      campuses: this.props.campuses
    });
  }



  handleChange(event){
    const input = event.target.value;
    const cammelCaseInput = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);});
    this.setState({searchValue: cammelCaseInput})
  }

  render(){
      console.log("image state", this.state.imageEntry);
      const campuses = this.state.campuses.filter(campus =>  campus.name.match(this.state.searchValue) || campus.name.match(this.state.searchValue.toUpperCase()) )
      return (
    <div className="container">
    <h1>Campuses</h1>
    <div className="row">

    <div className="col s6">
      <div className="row">
        <div className="input-field col s12">
          <i className="material-icons prefix">search</i>
          <input onChange={this.handleChange} type="text" id="campus-input" className="autocomplete"></input>
          <label htmlFor="campus-input">Search for a Campus</label>
        </div>
      </div>
    </div>

    <form className="col s6 right-align" encType="multipart/form-data" onSubmit={this.submitCampus}>
     <div className="input-field inline">
            <input name="campusName"onChange={(event) => this.setState({campusEntry: event.target.value})} value={this.state.campusEntry} id="campus-name" placeholder="Add a Campus" required/>
    </div>
    <div className="file-field input-field inline">
      <div className="btn">
        <span>File</span>
        <input onChange={(event)=>this.setState({imageEntry: event.target.value.slice(12)})} id="campus-image" name="image" type="file" required/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" value={this.state.imageEntry}/>
      </div>
    </div>
    <div className="input-field inline">
        <button type="submit" className="btn-floating btn-small waves-effect waves-light teal"><i className='material-icons'>add</i></button>
    </div>
  </form>
  </div>
    <div className="row">
    {
      campuses.map(campus => {
        return (
                <div key={campus.id} className="col m4">
                 <div className="card">
                  <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src={`/images/${campus.image}`}></img>
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">
                  {campus.name}</span>
                  <p><Link to={`/campus/${campus.id}`}>View Campus</Link></p>
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

    submitCampus(event){
      event.preventDefault();
      const formData = new FormData();
      const fileInput = document.getElementById('campus-image');
      formData.append('campusName',event.target.campusName.value);
      formData.append('image', fileInput.files[0]);
      this.props.handleSubmit(formData);
      // this.props.handleSubmit({name: event.target.campusName.value, image: event.target.image.value})
      this.setState({campusEntry: ''});
      this.setState({imageEntry: ''});
    }

}

const mapStateToProps = state => ({
  campuses: state.campuses
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: (campus) => dispatch(postCampus(campus))
});

export default connect(mapStateToProps, mapDispatchToProps)(Campuses);
