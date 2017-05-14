import React, { Component } from 'react';
import Header from './Header';
import AuthService from './AuthService';

class Register extends Component {
  constructor(){
    super();

    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      }
    };

    this.submit = this.submit.bind(this);
  }


  submit(e){

    e.preventDefault();

    const name = encodeURIComponent(this.refs.name.value);
    const email = encodeURIComponent(this.refs.email.value);
    const password = encodeURIComponent(this.refs.password.value);

    const requestBody = `name=${name}&email=${email}&password=${password}`;

    fetch(`/api/users/register`, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic '+btoa('medicalhall:Y%pw)AJNPMsgb*x~5nyJ8W+'),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: requestBody
    }).then(function(response){
      response.json().then(function(data) {
        this.setState({
          errors: {}
        });

        localStorage.setItem("userid",data._id);
        //Temporary code - This is not ideal solution
        window.location.assign('http://' + window.location.hostname + ':' + window.location.port + '/dashboard')
        
      }.bind(this))
    }.bind(this))
    .catch(function(error){
      const errors={}
      errors.error = error ? error : {};
      this.setState({
          errors
        });
    });
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
                            <h1 className="loginTop">Register</h1>
                            <form role="form" onSubmit={this.submit} id="login-form">
                                <div className="form-group">
                                    <label htmlFor="name" className="sr-only">Name</label>
                                    <input type="name" ref="name" name="name" id="name" className="form-control" placeholder="Name"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="sr-only">Email</label>
                                    <input type="email" ref="email" name="email" id="email" className="form-control" placeholder="Email"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="key" className="sr-only">Password</label>
                                    <input type="password" ref="password" name="key" id="key" className="form-control" placeholder="Password"/>
                                </div>
                                <input type="submit" id="btn-login" className="btn btn-custom btn-lg btn-block" value="Register"/>
                            </form>

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


export default Register;
