import React, { Component } from 'react'
import Header from './Header';

class Patients extends Component {

  constructor(props){
    super(props);
    this.state={
      patients:[],
      isLoaded:false
    }
    this.getPatients = this.getPatients.bind(this);
  }

  componentWillMount(){
    this.getPatients();
  }

  getPatients(){
    return fetch(`/api/patients`,{
       method: 'get',
       headers: {
         'Authorization': 'Basic '+btoa('medicalhall:Y%pw)AJNPMsgb*x~5nyJ8W+'),
         'Content-Type': 'application/x-www-form-urlencoded'
       }})
    .then(function(response){
      response.json().then(function(data) {
        this.setState({patients:data,isLoaded:true})
      }.bind(this))
    }.bind(this))
    .catch(function(error){
      console.log("error")
      return "[]";
    });
  };

  render(){

    if(this.state.isLoaded) {
      return(
          <div>
            <Header />
            <div className="page-header">
              <h3>Patients</h3>
              <a href="#" className="btn btn-success btn-lg"><span className="glyphicon glyphicon-plus"></span> New Patient</a>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th><input type="checkbox" id="checkall" /></th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.patients.map((patient, index) => (
                    <PatientRow _id={patient._id}
                                name={patient.name}
                                age={patient.age}
                                sex={patient.sex}
                                />
                ))}
              </tbody>
            </table>
            <div className="clearfix"></div>
            <ul className="pagination pull-right">
              <li className="disabled"><a href="#"><span className="glyphicon glyphicon-chevron-left"></span></a></li>
              <li className="active"><a href="#">1</a></li>
              <li><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">4</a></li>
              <li><a href="#">5</a></li>
              <li><a href="#"><span className="glyphicon glyphicon-chevron-right"></span></a></li>
            </ul>
          </div>
      )
    }
    else {
      return(
        <div>Loading..</div>
      )
    }
  }

}

const PatientRow=(props) =>
      <tr key={props._id}>
        <td><input type="checkbox" className="checkthis" /></td>
        <td key={props.name}>{props.name}</td>
        <td key={props.age}>{props.age}</td>
        <td key={props.sex}>{props.sex}</td>
        <td><p data-placement="top" data-toggle="tooltip" title="Edit"><button className="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" ><span className="glyphicon glyphicon-pencil"></span></button></p></td>
        <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button className="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" ><span className="glyphicon glyphicon-trash"></span></button></p></td>
      </tr>


export default Patients
