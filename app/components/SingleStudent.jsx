import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchStudent } from '../store';
import { connect } from 'react-redux';


class SingleStudent extends Component{
    componentDidMount() {
        const studentId = this.props.match.params.id
        this.props.fetchStudent(studentId)
    }
    render(){
        return (
                    <div className='container'>
                        <h1>{this.props.student.first_name} {this.props.student.last_name}</h1>
                        <div className="row">
                            <div className="col m6">
                                <h2>{this.props.student.email}</h2>

                                <form className="col s12" >
                                 <div className="input-field inline">
                                        <input name="campusName" id="campus-name" placeholder={this.props.student.first_name}/>
                                </div>
                                <div className="input-field inline">
                                        <input name="campusName" id="campus-name" placeholder={this.props.student.last_name}/>
                                </div>
                                <div className="input-field inline">
                                        <input name="campusName" id="campus-name" placeholder={this.props.student.email}/>
                                </div>
                                <div className="file-field input-field inline">
                                    <button type="submit" className="btn-floating btn-small waves-effect waves-light teal"><i className='material-icons'>check</i></button>
                                </div>
                                <div className="file-field input-field inline">
                                    <button onClick={this.props.removeCampus} className="btn-floating btn-small waves-effect waves-light teal"><i className='material-icons'>delete</i></button>
                                </div>
                              </form>
                              </div>
                             <div className="col m6">
                            {
                                this.props.campuses.filter(campus => campus.id === this.props.student.campusId)
                                .map(campus => {
                                    return (
                                             <div key={campus.id} className="card">
                                              <div className="card-image waves-effect waves-block waves-light">
                                              <img className="activator" src={campus.image}></img>
                                            </div>
                                            <div className="card-content">
                                              <span className="card-title activator grey-text text-darken-4">
                                              {campus.name}<i className="material-icons right">more_vert</i></span>
                                              <p><Link to={`/campus/${campus.id}`}>View Campus</Link></p>
                                            </div>
                                          </div>
                                        )
                                })
                            }
                        </div>

                    </div>
                    </div>
                )
    }
}


const mapStateToProps = (state) => ({
  campuses: state.campuses,
  student: state.student

})

const mapDispatchToProps = (dispatch) => ({
  fetchStudent: (studentId) => dispatch(fetchStudent(studentId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent)
