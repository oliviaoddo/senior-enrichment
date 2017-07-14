import React from 'react';
import { Link } from 'react-router-dom';


export default function Footer(props){
  return(
        <footer className="page-footer lime lighten-1">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">MHIAJ</h5>
                <p className="grey-text text-lighten-4">Higher education for stellar JavaScript students.</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">About Us</h5>
                <ul>
                  <li><Link to="/students" className="grey-text text-lighten-3">Students</Link></li>
                  <li><Link to="/campuses" className="grey-text text-lighten-3">Campuses</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © 2017 Margaret Hamilton Interplanetary Academy of JavaScript
            <Link className="grey-text text-lighten-4 right" target="_blank" to="http://www.facebook.com"><i className="fa fa-facebook-official" aria-hidden="true"></i></Link>
            </div>
          </div>
        </footer>
      )
}
