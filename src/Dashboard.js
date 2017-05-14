import React, { Component } from 'react';
import Header from './Header';
import Patients from './Patients';

class Dashboard extends Component {
  constructor(){
    super();

    this.state = {
      errors: {},
    };

  }

  render(){
    return (
      <div>
            <Header />
            <div className="container">
            	<div className="row">
                  <div className="col-xs-2">
                  </div>
            	    <div className="col-xs-8">
                	    <div className="form-wrap">
                            <h1 className="loginTop">Dashboard</h1>
                            <Patients />
                	    </div>
            		</div>
                <div className="col-xs-2">
                </div>
            	</div>
          </div>
      </div>
    )
  }
}


export default Dashboard;
