import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import App from './App';
import Whoops404 from './Whoops404'
import Patients from './Patients'
import Login from './Login'
import Register from './Register'
import Dashboard from './Dashboard'
import NewPatient from './NewPatient'

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


ReactDOM.render(
  <Router>
      <div>
        <Route exact path="/" component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/patients" component={Patients}/>
        <Route path="/newpatient" component={NewPatient}/>
        <Route path="*" component={Whoops404}/>
      </div>
  </Router>,
  document.getElementById('root')
);
