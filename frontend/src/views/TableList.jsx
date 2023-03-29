
import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import history from '../utils/history';
import * as url from '../utils/constant';
import axios from 'axios';
import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import '../assets/css/custom.scss';

let columns = [
  {"value":"Name"},
  {"value":"Address"},
  {"value":"Height"},
  {"value":"Weight"},
  {"value":"Age"},
  {"value":"DOB"},
  {"value":"SSN"},
  {"value":"Gender"},
]

class TableList extends Component {
 
  state = {
    tableHeader:columns,
    file:[],
    patientDetail:[],
  }

  componentDidMount(){
    this.getPatientDetail();
  }

  getPatientDetail(){
    axios.get(url.getPatientDetailUrl,
         
      )
      .then((response) => {
        debugger;
        this.setState({
          patientDetail:response.data,
        });
      })
      .catch((error) => {
        
      })
      .finally(() => {
          // always executed
      });
  }

  fileSelectedCarImg = event =>{
    debugger;
    const file =(event.target.files);

    this.setState({ 
      file:file
    },()=>{
      this.uploadFiles();
    });
  }

  uploadFiles = () => {
      var formData = new FormData();
      let files= this.state.file;
      
      for (const file of files) {
        formData.append('pdf_files', file);
      }

      // for (let i = 0; i < files.length; i++) {
      //   formData.append(`pdf_files[${i}]`, files[i])
      // }
      // formData.append("pdf_files", this.state.file);
  
      // const config = {
      //     enctype="multipart/form-data"
      //     headers: { Authorization: `Token ${localStorage.getItem('userToken')}`}
      // };
      
      let that = this;
      axios.post(url.scrapeDataUrl,
          formData,
          {
            headers: {
                "Content-type": "multipart/form-data",
            },                    
        }
      )
      .then((response) => {
          let data = this.state.patientDetail;
          data = [...data,...response.data.data]
          this.setState({
            patientDetail:data
          });
      })
      .catch((error) => {
        
      })
      .finally(() => {
          // always executed
      });
  }

  render() {
    return (
      <div id="table-list" className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
            <input className="header-upload-btn" type="file" onChange={this.fileSelectedCarImg.bind(this)} ref={fileInput3 => this.fileInput3 = fileInput3 }  multiple />
            {/* <button onClick={this.fileUploadCarImg} c>Upload</button> */}
              <Card
                title="Patient Detail"
                category=""
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {this.state.tableHeader.map((prop, key) => {
                          return <th key={key}>{prop.value}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.patientDetail.length > 0 && this.state.patientDetail.map((prop, key) => {
                       return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>

       
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TableList;
