
import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import history from '../utils/history';
import * as url from '../utils/constant';
import axios from 'axios';
import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import PdfTemplate from './PdfTemplate/PdfTemplate';
import { PDFExport } from '@progress/kendo-react-pdf';
import  qs from 'qs';

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

const Countries = [
  { label: "Albania", value: 355 },
  { label: "Argentina", value: 54 },
  { label: "Austria", value: 43 },
  { label: "Cocos Islands", value: 61 },
  { label: "Kuwait", value: 965 },
  { label: "Sweden", value: 46 },
  { label: "Venezuela", value: 58 }
];

const PainLevel = [
  { label: "Level 1 (Moderate)", value: "Level 1 (Moderate)" },
  { label: "Level 2 (Moderate)", value: "Level 2 (Moderate)" },
  { label: "Level 3 (Moderate)", value: "Level 3 (Moderate)" },
  { label: "Level 4 (Moderate)", value: "Level 4 (Moderate)" },
  { label: "Level 5 (Moderate)", value: "Level 5 (Moderate)" },
  { label: "Level 6 (Severe)",  value: "Level 6 (Severe)" },
  { label: "Level 7 (Severe)",  value: "Level 7 (Severe)" },
  { label: "Level 8 (Severe)",  value: "Level 8 (Severe)" },
  { label: "Level 9 (Severe)",  value: "Level 9 (Severe)" },
  { label: "Level 10 (Severe)", value: "Level 10 (Severe)" },
];

// chief_complaint = models.TextField()
// subjective = models.TextField()
// surgery = models.TextField()
// objective_assessment = models.TextField()
// overall_diagnosis = models.TextField()
// plan_and_treatment_goals = models.TextField()
// indications_of_need = models.TextField()
// treatment_goals_for = models.TextField()
class Typography extends Component {
 

  state = {
    tableHeader:columns,
    pdfData:[],
    file:[],
    diseaseCodes:[],
    diagnosis:[],
    orthosisDevicesPrescribed:[],
    statementMedicalNecessity:[],
    previouslyTriedTreatments:[],
    valuesList:[],
    indication:[],
    treatment:[],
    dme:[],
    dmeVal:'',
    diseaseCodeVal:'',
    diagnosisVal:'',
    orthosisDevicesPrescribedVal:'',
    statementMedicalNecessityVal:'',
    previouslyTriedTreatmentsVal:'',
    indicationVal:'',
    treatmentVal:'',
    isSaveButtonClicked: false,
    showDiseaseOption:false,
    showExamNotes:false,
   
    chiefComplaint:[],
    PainLevelList:[],
    subjective:[],
    surgery:[],
    objectiveAssessment:[],
    overallDiagnosis:[],
    planTreatmentGoals:[],
    treatmentGoalsFor:[],
    indicationsNeed:[],

    chiefComplaintVal:'',
    subjectiveVal:'',
    surgeryVal:'',
    objectiveAssessmentVal:'',
    overallDiagnosisVal:'',
    planTreatmentGoalsVal:'',
    indicationsNeedVal:'',
    treatmentGoalsForVal:'',
    painLevelVal:''
  }

  componentDidMount(){
      this.getDiseaseCode();
      this.setState({PainLevelList:PainLevel})
  }

  getDiseaseCode(){
    axios.get(url.getDiseaseCodeUrl,
         
      )
      .then((response) => {
        let arr = [];
        if(response.data){
          response.data.map((item)=>{
            let obj = {}
            obj.value = item.disease_code;
            obj.label = item.disease_code;
            arr.push(obj);
          });
          arr = this.uniq(arr,'value')
          
          this.setState({
            diseaseCodes: arr
          });
        }
         
      })
      .catch((error) => {
        
      })
      .finally(() => {
          // always executed
      });
  }

  getDiseaseData = (event) => {
      let data = this.state.valuesList;
      data.push(event.value);
      this.setState({
        valuesList:data,
      });
      this.setState({
        diseaseCodeVal:event.value,
        showDiseaseOption:false,
      });

      axios.get(url.getDiseaseDataUrl,{
          params: {
            id: event.value,
          }
        }
      )
      .then((response) => {
        let arr = [];
       
        if(response.data){
            response.data.map((item)=>{
              let obj = {}
              obj.value = item.diagnosis;
              obj.label = item.diagnosis;
              arr.push(obj);
            });
            arr = this.uniq(arr,'value')
            this.setState({
              diagnosis: arr
            });


            arr = [];
            response.data.map((item)=>{
              let obj = {}
              obj.value = item.orthosis_devices_prescribed;
              obj.label = item.orthosis_devices_prescribed;
              arr.push(obj);
            });
            arr = this.uniq(arr,'value')
            this.setState({
              orthosisDevicesPrescribed: arr
            });

            
            arr = [];
            response.data.map((item)=>{
              let obj = {}
              obj.value = item.statement_of_medical_necessity;
              obj.label = item.statement_of_medical_necessity;
              arr.push(obj);
            });
            arr = this.uniq(arr,'value')
            this.setState({
              statementMedicalNecessity: arr
            });

            arr = [];
            response.data.map((item)=>{
              let obj = {}
              obj.value = item.previously_tried_treatments;
              obj.label = item.previously_tried_treatments;
              arr.push(obj);
            });
            arr = this.uniq(arr,'value')
            this.setState({
              previouslyTriedTreatments: arr
            });

            arr = [];
            response.data.map((item)=>{
              let obj = {}
              obj.value = item.indication;
              obj.label = item.indication;
              arr.push(obj);
            });
            arr = this.uniq(arr,'value')
            this.setState({
              indication: arr
            });

            arr = [];
            response.data.map((item)=>{
              if(item.dme){
                let obj = {}
                obj.value = item.dme;
                obj.label = item.dme;
                arr.push(obj);
              }
            });
            arr = this.uniq(arr,'value');
            debugger;
            this.setState({
              dme: arr
            });

            arr = [];
            response.data.map((item)=>{
              let obj = {}
              obj.value = item.treatment;
              obj.label = item.treatment;
              arr.push(obj);
            });
            arr = this.uniq(arr,'value')
            this.setState({
              treatment: arr,
              showDiseaseOption:true,
            });
        }
         
      })
      .catch((error) => {
        
      })
      .finally(() => {
          // always executed
      });
  }

  setDiagnosisVal = (event) => {
    this.setState({
      diagnosisVal:event.value,
    });
  }

  setDME = (event) => {
    this.setState({
      dmeVal:event.value,
    });
  }

  setOrthosisDevicesPrescribedVal = (event) => {
    this.setState({
      orthosisDevicesPrescribedVal:event.value,
    });
  }

  setStatementMedicalNecessityVal = (event) => {
    this.setState({
      statementMedicalNecessityVal:event.value,
    });
  }

  setPreviouslyTriedTreatmentsVal = (event) => {
    this.setState({
      previouslyTriedTreatmentsVal:event.value,
    });
  }

  setIndicationVal = (event) => {
    this.setState({
      indicationVal:event.value,
    });
  }

  setTreatmentVal = (event) => {
    this.setState({
      treatmentVal:event.value,
    });
  }

  uniq(a, param){
    return a.filter((item, pos, array)=>{
      return array.map((mapItem)=>{ return mapItem[param]; }).indexOf(item[param]) === pos;
    })
  }

  addToArray = e =>{
    debugger

    let obj = {
      diseaseCodeVal: this.state.diseaseCodeVal,             
      diagnosisVal:this.state.diagnosisVal,                   
      orthosisDevicesPrescribedVal:this.state.orthosisDevicesPrescribedVal,   
      statementMedicalNecessityVal:this.state.statementMedicalNecessityVal,   
      previouslyTriedTreatmentsVal:this.state.previouslyTriedTreatmentsVal,   
      indicationVal:this.state.indicationVal,                  
      treatmentVal:this.state.treatmentVal,                   
      dmeVal:this.state.dmeVal,       
      
      painLevelVal:this.state.painLevelVal,             
    }
    let arr = [];
    arr.push(obj)

    let data = this.state.pdfData;
    arr = [...arr, ...data];
    this.setState({
      pdfData:arr,
      showDiseaseOption:false,
      dmeVal:'',
      diseaseCodeVal:'',
      diagnosisVal:'',
      orthosisDevicesPrescribedVal:'',
      statementMedicalNecessityVal:'',
      previouslyTriedTreatmentsVal:'',
      indicationVal:'',
      treatmentVal:'',
    }
      ,()=>{
        if(this.state.isSaveButtonClicked){
          this.pdfExportComponent.save(); 
          this.setState({
            isSaveButtonClicked:false,
          })
        }
      });
  }

  savePdf = (e) => {
    this.setState({
      isSaveButtonClicked:true,
    },()=>{
      this.addToArray()
    })
  }



  getExamNotes = (event) => {
    
    this.setState({
      showExamNotes:false,
    });

    axios.get(url.getExamNotesUrl,     
    )
    .then((response) => {
      let arr = [];
      if(response.data){
          response.data.map((item)=>{
            let obj = {}
            obj.value = item.chief_complaint;
            obj.label = item.chief_complaint;
            arr.push(obj);
          });
          arr = this.uniq(arr,'value')
          this.setState({
            chiefComplaint: arr
          });

          arr = [];
          response.data.map((item)=>{
            let obj = {}
            obj.value = item.subjective;
            obj.label = item.subjective;
            arr.push(obj);
          });
          arr = this.uniq(arr,'value')
          this.setState({
            subjective: arr
          });

          
          arr = [];
          response.data.map((item)=>{
            let obj = {}
            obj.value = item.surgery;
            obj.label = item.surgery;
            arr.push(obj);
          });
          arr = this.uniq(arr,'value')
          this.setState({
            surgery: arr
          });

          arr = [];
          response.data.map((item)=>{
            let obj = {}
            obj.value = item.objective_assessment;
            obj.label = item.objective_assessment;
            arr.push(obj);
          });
          arr = this.uniq(arr,'value')
          this.setState({
            objectiveAssessment: arr
          });

          arr = [];
          response.data.map((item)=>{
            let obj = {}
            obj.value = item.overall_diagnosis;
            obj.label = item.overall_diagnosis;
            arr.push(obj);
          });
          arr = this.uniq(arr,'value')
          this.setState({
            overallDiagnosis: arr
          });

          arr = [];
          response.data.map((item)=>{
              let obj = {}
              obj.value = item.plan_and_treatment_goals;
              obj.label = item.plan_and_treatment_goals;
              arr.push(obj);
          });
          arr = this.uniq(arr,'value');
          this.setState({
            planTreatmentGoals: arr
          });

          arr = [];
          response.data.map((item)=>{
            let obj = {}
            obj.value = item.indications_of_need;
            obj.label = item.indications_of_need;
            arr.push(obj);
          });
          arr = this.uniq(arr,'value')
          this.setState({
            indicationsNeed: arr,
          });

          arr = [];
          response.data.map((item)=>{
            let obj = {}
            obj.value = item.treatment_goals_for;
            obj.label = item.treatment_goals_for;
            arr.push(obj);
          });
          arr = this.uniq(arr,'value')
          this.setState({
            treatmentGoalsFor: arr,
            showExamNotes:true
          });

      }
       
    })
    .catch((error) => {
      
    })
    .finally(() => {
        // always executed
    });
  }


  setChiefComplaintVal = (event) => {
    this.setState({
      chiefComplaintVal:event.value,
    });
  }

  setSubjectiveVal = (event) => {
    this.setState({
      subjectiveVal:event.value,
    });
  }

  setSurgeryVal = (event) => {
    this.setState({
      surgeryVal:event.value,
    });
  }

  setObjectiveAssessmentVal = (event) => {
    this.setState({
      objectiveAssessmentVal:event.value,
    });
  }

  setOverallDiagnosisVal = (event) => {
    this.setState({
      overallDiagnosisVal:event.value,
    });
  }

  setPlanTreatmentGoalsVal = (event) => {
    this.setState({
      planTreatmentGoalsVal:event.value,
    });
  }

  setIndicationsNeedVal = (event) => {
    this.setState({
      indicationsNeedVal:event.value,
    });
  }

  setTreatmentGoalsForVal = (event) => {
    this.setState({
      treatmentGoalsForVal:event.value,
    });
  }

  setPainLevelVal= (event) => {
    this.setState({
      painLevelVal:event.value,
    });
  }

  // getExamNotes = (e) =>{
  //   this.setState({showExamNotes:true});
  //   axios.get(url.getExamNotesUrl,{
  //     params: {
  //       list: this.state.valuesList.toLocaleString(),
  //     },
  //   }
  //   )
  //   .then((response) => {

      
  //   })
  //   .catch((error) => {
      
  //   })
  //   .finally(() => {
  //       // always executed
  //   });
  // }

  render() {
    return (
      <div id="table-list" className="content">
         <Card
              title="Disease"
              category=""
              ctTableFullWidth
              ctTableResponsive
              content = {
                <div class = "disease-main">
                  {this.state.diseaseCodes &&
                  <div className = "col-12">
                    <div className = "col-md-3">
                        <p>Disease Code</p>
                        <Select onChange = {this.getDiseaseData.bind(this)} options={this.state.diseaseCodes} />
                    </div>

                    <div className = "col-md-3">
                        <p>DME</p>
                        <Select onChange = {this.setDME.bind(this)} options={this.state.dme} />
                    </div>
                      
                  </div>
                  }

                  {this.state.showDiseaseOption && 
                    <div>
                      <div>
                        {this.state.diagnosis &&<div className = "col-md-3 col-12 mt-3 mt-3 mt-3">
                            <p className = 'mb-0'>Diagnosis</p>
                            <Select onChange = {this.setDiagnosisVal.bind(this)} options={this.state.diagnosis} />
                        </div>
                        }

                        {this.state.orthosisDevicesPrescribed &&<div className = "col-md-3 col-12 mt-3">
                            <p className = 'mb-0'>Orthosis Devices Prescribed</p>
                            <Select onChange = {this.setOrthosisDevicesPrescribedVal.bind(this)} options={this.state.orthosisDevicesPrescribed} />
                        </div>
                        }

                        {this.state.statementMedicalNecessity &&<div className = "col-md-3 col-12 mt-3">
                            <p className = 'mb-0'>Statement Medical Necessity</p>
                            <Select onChange = {this.setStatementMedicalNecessityVal.bind(this)} options={this.state.statementMedicalNecessity} />
                        </div>
                        }
                      </div>

                      <div>
                      {this.state.previouslyTriedTreatments &&<div className = "col-md-3 col-12 mt-3">
                          <p className = 'mb-0'>Previously Tried Treatments</p>
                          <Select onChange = {this.setPreviouslyTriedTreatmentsVal.bind(this)} options={this.state.previouslyTriedTreatments} />
                      </div>
                      }

                      {this.state.PainLevelList && <div className = "col-md-3 col-12 mt-3">
                          <p className = 'mb-0'>Pain Level Described by Patient</p>
                          <Select onChange = {this.setPainLevelVal.bind(this)} options={this.state.PainLevelList} />
                      </div>
                      }

                      {this.state.indication &&<div className = "col-md-3 col-12 mt-3">
                          <p className = 'mb-0'>Indication</p>
                          <Select onChange = {this.setIndicationVal.bind(this)} options={this.state.indication} />
                      </div>
                      }

                      {this.state.treatment &&<div className = "col-md-3 col-12 mt-3">
                          <p className = 'mb-0' >New Treatment</p>
                          <Select onChange = {this.setTreatmentVal.bind(this)} options={this.state.treatment} />
                    </div>
                }
                  </div>
                    </div>
                  } 

                  {this.state.showExamNotes && 
                    <div>
                      <h4 className="title" style={{padding: '15px 15px 0'}}>Exam Notes</h4>
                      <div>
                        {this.state.chiefComplaint &&<div className = "col-md-3 col-12 mt-3 mt-3 mt-3">
                            <p className = 'mb-0'>Chief Complaint</p>
                            <Select onChange = {this.setChiefComplaintVal.bind(this)} options={this.state.chiefComplaint} />
                        </div>
                        }

                        {this.state.subjective &&<div className = "col-md-3 col-12 mt-3">
                            <p className = 'mb-0'>Subjective</p>
                            <Select onChange = {this.setSubjectiveVal.bind(this)} options={this.state.subjective} />
                        </div>
                        }

                        {this.state.surgery &&<div className = "col-md-3 col-12 mt-3">
                            <p className = 'mb-0'>Surgery</p>
                            <Select onChange = {this.setSurgeryVal.bind(this)} options={this.state.surgery} />
                        </div>
                        }
                      </div>

                      <div>
                      {this.state.objectiveAssessment &&<div className = "col-md-3 col-12 mt-3">
                          <p className = 'mb-0'>Objective Assessment</p>
                          <Select onChange = {this.setObjectiveAssessmentVal.bind(this)} options={this.state.objectiveAssessment} />
                      </div>
                      }

                      {this.state.overallDiagnosis &&<div className = "col-md-3 col-12 mt-3">
                          <p className = 'mb-0'>Overall Diagnosis</p>
                          <Select onChange = {this.setOverallDiagnosisVal.bind(this)} options={this.state.overallDiagnosis} />
                      </div>
                      }

                      {this.state.planTreatmentGoals &&<div className = "col-md-3 col-12 mt-3">
                          <p className = 'mb-0' >Plan Treatment and Goals</p>
                          <Select onChange = {this.setPlanTreatmentGoalsVal.bind(this)} options={this.state.planTreatmentGoals} />
                      </div>
                      }

                    {this.state.indicationsNeed &&<div className = "col-md-3 col-12 mt-3">
                          <p className = 'mb-0' >Indications Need</p>
                          <Select onChange = {this.setIndicationsNeedVal.bind(this)} options={this.state.indicationsNeed} />
                      </div>
                      }

                      {this.state.treatmentGoalsFor &&<div className = "col-md-3 col-12 mt-3">
                          <p className = 'mb-0' > Treatment Goals For  </p>
                          <Select onChange = {this.setTreatmentGoalsForVal.bind(this)} options={this.state.treatmentGoalsFor} />
                      </div>
                      }
                    </div>
                  </div>
                  } 

                  <div className = "col-12 mt-3">
                    <button onClick={this.addToArray.bind(this)}  className="ml-3 btn btnSubmit share" type="submit">
                      Add More
                    </button>
                    <button onClick={this.getExamNotes.bind(this)}  className="ml-3 btn btnSubmit share" type="submit">
                      Add Exam Notes
                    </button>
                    <button style = {{marginLeft:"15px"}} onClick={this.savePdf.bind(this)}  className="btn btnSubmit share" type="submit">
                      Generate PDF
                    </button>
                    <div style={{ position: "absolute", left: "-1000px", top: 0 }}>
                      <PDFExport
                          paperSize="A4"
                          margin="1cm"
                          fileName={this.state.diseaseCodeVal}
                          ref={(component) => this.pdfExportComponent = component}
                      >
                          <div style={{ width: "500px" }}>
                            <PdfTemplate examNotes = {this.state} pdfData = {this.state.pdfData}/>
                          </div>
                      </PDFExport>
                    </div>
                  </div>
                </div>
              }
        />

      </div> 
    );
  }
}

export default Typography;
