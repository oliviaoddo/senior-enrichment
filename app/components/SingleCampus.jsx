import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { fetchCampus, postStudent, changeCampus, updateCampus, deleteCampus } from '../store';

class SingleCampus extends Component{
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            campusEntry: '',
            search: false,
            students: [],
            searchValue: ''
        }
        this.onStudentSubmit = this.onStudentSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmitCampus = this.onSubmitCampus.bind(this);
    }

    handleChange(event){
      const input = event.target.value;
      const cammelCaseInput = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      this.setState( {searchValue: cammelCaseInput})
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        students: nextProps.students
      });
    }



    componentDidMount() {
        this.props.fetchCampus()
        .then(() => {
          this.setState({campusEntry: this.props.campus.name, students: this.props.students.filter(student => student.campusId === this.props.campus.id) })
        })
    }

    render(){
        const students =  this.state.students.filter(student =>  student.first_name.match(this.state.searchValue) || student.last_name.match(this.state.searchValue) || student.first_name.concat(' ').concat(student.last_name).match(this.state.searchValue))
        return (
                <div className='container'>
                    <div>
                        <div className="row">
                        <h1>{this.props.campus.name}</h1>
                            <div className="col m5">
                                  <div className="card">
                                    <div className="card-image waves-effect waves-block waves-light">
                                      <img className="activator" src={`/images/${this.props.campus.image}`}></img>
                                    </div>
                                  </div>
                            </div>
                            <div className="col m7">
                            <div className="row">
                            <form className="col s12 right-align" encType="multipart/form-data" id="edit-form" onSubmit={this.onSubmitCampus}>
                            <label htmlFor="edit-form">Edit</label>
                             <div className="input-field inline">
                                    <input name="campusName"onChange={(event) => this.setState({campusEntry: event.target.value})} id="campus-name" value={this.state.campusEntry} required/>
                            </div>
                            <div className="file-field input-field inline">
                              <div className="btn">
                                <span>File</span>
                                <input id="campus-image" name="file" type="file"/>
                              </div>
                              <div className="file-path-wrapper">
                                <input className="file-path validate" value={this.props.campus.image} type="text"/>
                              </div>
                            </div>
                            <div className="input-field inline">
                                <button type="submit" className="btn-floating btn-small waves-effect waves-light teal"><i className='material-icons'>check</i></button>
                            </div>
                            <div className="input-field inline">
                                <button onClick={this.props.removeCampus} className="btn-floating btn-small waves-effect waves-light teal"><i className='material-icons'>delete</i></button>
                            </div>
                          </form>
                        </div>
                            </div>

                        </div>
                        <div className="row">
                            <h5>Students <i onClick={() => this.setState({search: true})}className="material-icons">search</i>{this.state.search ? <div className="input-field inline">
                                    <input name="campusName" onChange={this.handleChange} id="campus-name" placeholder="Search for a Student"/>
                            </div>: null }</h5>
                                <form onSubmit={this.onStudentSubmit}>
                                  <table className="striped responsive-table">
                                    <thead>
                                      <tr>
                                          <th>First Name</th>
                                          <th>Last Name</th>
                                          <th>Email</th>
                                          <th></th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                    {!this.state.searchValue ?
                                    <tr>

                                            <td><input placeholder={`Add a student to ${this.props.campus.name}`} value={this.state.firstName} name="firstName" onChange={(event) => this.setState({firstName: event.target.value})} required></input></td>
                                            <td><input value={this.state.lastName} name="lastName" onChange={(event) => this.setState({lastName: event.target.value})} required></input></td>
                                            <td><input value={this.state.email} name="email" onChange={(event) => this.setState({email: event.target.value})} type="email" required></input></td>
                                            <td><button type="submit" className="btn-floating btn-small waves-effect waves-light teal"><i className='material-icons'>add</i></button></td>

                                    </tr>
                                    : null
                                  }
                                    {
                                        students.filter(student => student.campusId === this.props.campus.id)
                                        .map(student => {
                                            return (
                                                    <tr key={student.id}>
                                                        <td>{student.first_name}</td>
                                                        <td>{student.last_name}</td>
                                                        <td>{student.email}</td>
                                                        <td><Link to={`/student/${student.id}`}><i className="material-icons">visibility</i></Link></td>
                                                    </tr>
                                                    )
                                        })
                                    }
                                    </tbody>
                                  </table>
                                </form>
                        </div>
                        </div>
                    </div>
                )
    }

  onStudentSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit({firstName: event.target.firstName.value, lastName: event.target.lastName.value, email: event.target.email.value, campusId: this.props.match.params.id})
    this.setState({firstName: '', lastName: '', email: ''});


  }

  onSubmitCampus(event){
      event.preventDefault();
      const formData = new FormData();
      const fileInput = document.getElementById('campus-image');
      formData.append('campusName', event.target.campusName.value);
      console.log("file input in the on submit", fileInput.files[0]);
      if(fileInput.files[0]) formData.append('image', fileInput.files[0]);
      this.props.editCampus(formData);
  }
}

const mapStateToProps = (state) => ({
  students: state.students,
  campus: state.campus,
  newEntry: state.newCampusEntry

})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchCampus: () => dispatch(fetchCampus(ownProps.match.params.id)),
  handleSubmit: (student) => dispatch(postStudent(student)),
  editCampus: (data) => dispatch(updateCampus(data,ownProps.match.params.id )),
    removeCampus(event){
      event.preventDefault();
       dispatch(deleteCampus(ownProps.match.params.id, ownProps.history));
  }
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleCampus));
