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
            email: ''
        }

        this.changeFname = this.changeFname.bind(this);
        this.changeLname = this.changeLname.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
    }
    componentDidMount() {
        this.props.fetchCampus();
    }

    changeFname(event){
        this.setState({firstName: event.target.value})
        console.log(this.state);
    }
    changeLname(event){
        this.setState({lastName: event.target.value})
    }
    changeEmail(event){
        this.setState({email: event.target.value})
    }

    render(){
        console.log(this.props.students);
        return (
                <div className='container'>
                    {this.props.campus ?
                    <div>
                        <div className="row">
                        <h1>{this.props.campus.name}</h1>
                            <div className="col m5">
                                  <div className="card">
                                    <div className="card-image waves-effect waves-block waves-light">
                                      <img className="activator" src={this.props.campus.image}></img>
                                    </div>
                                  </div>
                            </div>
                            <div className="col m7">
                            <div className="row">
                            <form className="col s12 right-align" onSubmit={this.props.editCampus} >
                             <div className="input-field inline">
                                    <input name="campusName"onChange={this.props.editCampus} value={this.props.campus.newEntry} id="campus-name" placeholder={this.props.campus.name}/>
                            </div>
                            <div className="file-field input-field inline">
                              <div className="btn">
                                <span>File</span>
                                <input type="file"/>
                              </div>
                              <div className="file-path-wrapper">
                                <input className="file-path validate" value={this.props.campus.image} type="text"/>
                              </div>
                            </div>
                            <div className="file-field input-field inline">
                                <button type="submit" className="btn-floating btn-small waves-effect waves-light teal"><i className='material-icons'>check</i></button>
                            </div>
                            <div className="file-field input-field inline">
                                <button onClick={this.props.removeCampus} className="btn-floating btn-small waves-effect waves-light teal"><i className='material-icons'>delete</i></button>
                            </div>
                          </form>
                        </div>
                            </div>

                        </div>
                        <div className="row">
                            <h5>Students</h5>
                                <form onSubmit={this.props.handleSubmit}>
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
                                    <tr>

                                            <td><input value={this.state.firstName} name="firstName" onChange={this.changeFname}></input></td>
                                            <td><input value={this.state.lastName} name="lastName" onChange={this.changeLname} ></input></td>
                                            <td><input value={this.state.email} name="email" onChange={this.changeEmail} ></input></td>
                                            <td><button type="submit" className="btn-floating btn-small waves-effect waves-light teal"><i className='material-icons'>add</i></button></td>

                                    </tr>
                                    {
                                        this.props.students.filter(student => student.campusId === this.props.campus.id)
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
                        : null
                        }
                    </div>
                )
    }
}

const mapStateToProps = (state) => ({
  students: state.students,
  campus: state.campus,
  newEntry: state.newCampusEntry

})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchCampus: () => dispatch(fetchCampus(ownProps.match.params.id)),
  handleSubmit(event){
      event.preventDefault();
      dispatch(postStudent({firstName: event.target.firstName.value, lastName: event.target.lastName.value, email: event.target.email.value, campusId: ownProps.match.params.id}));
      // this.setState({firstName: '', lastName: '', email: ''});
  },
  editCampus(event){
      dispatch(changeCampus(event.target.value))
  },
  changeImage(event){
      event.preventDefault();
  },

    editCampus(event){
      event.preventDefault();
       dispatch(updateCampus({name: event.target.campusName.value, image: 'img.jpg'}, ownProps.match.params.id));
  },
    removeCampus(event){
      event.preventDefault();
       dispatch(deleteCampus(ownProps.match.params.id, ownProps.history));
  }
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleCampus));
