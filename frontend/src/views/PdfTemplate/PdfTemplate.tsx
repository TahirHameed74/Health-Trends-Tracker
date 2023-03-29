import React, { useState } from 'react';
import moment from 'moment';
import moments from 'moment-timezone';

import './pdf.scss';

interface PdfTemplateProps {
    pdfData : any,
    examNotes:any,
}
interface PdfTemplateState {

}


class PdfTemplate extends React.Component<PdfTemplateProps, PdfTemplateState> {

    diseaseCodeVal = '';
    diagnosisVal = '';
    orthosisDevicesPrescribedVal = '';
    statementMedicalNecessityVal = '';
    previouslyTriedTreatmentsVal = '';
    indicationVal= '';
    treatmentVal = '';
    dmeVal = '';
    time:any;

    componentWillReceiveProps(prevProps:any){
        debugger;
        let obj = new Date();
        let zn = moments.tz(moments.tz.guess()).zoneAbbr();
        this.time =  moment(obj).format('DD/MM/YYYY') + ' at ' + moment(obj).format('HH:mm A') + ' ' + zn;
    }

    render(){
        return (
            <div>
                <div className="pdf">
                    {this.props.pdfData.length>0 && this.props.pdfData.map((item:any)=>{
                        return(
                            <div>
                                <div className = "dme">
                                <p className="paragraph">{item.dmeVal} <p className="paragraph">{this.time}</p> </p>
                                </div> 
                                <p className="paragraph mt-2"><b>Diesease Code:</b> <p className = "description">{item.diseaseCodeVal }</p> </p>   
                                <p className="paragraph mt-2"><b>Diagnosis:</b> <p className = "description">{item.diagnosisVal} </p> </p>
                                <p className="paragraph mt-2"><b>Orthosis Devices Prescribed:</b>  <p className = "description">{item.orthosisDevicesPrescribedVal}</p> </p>
                                <p className="paragraph mt-2"><b>Statement Medical NecessityVal:</b>  <p className = "description">{item.statementMedicalNecessityVal}</p> </p>
                                <p className="paragraph mt-2"><b>Previously Tried TreatmentsVal:</b>  <p className = "description">{item.previouslyTriedTreatmentsVal}</p> </p>
                                <p className="paragraph mt-2"><b>Indication: </b> <p className = "description">{item.indicationVal}</p> </p>
                                <p className="paragraph mt-2 mb-4"><b>Treatment:</b> <p className = "description">{item.treatmentVal}</p> </p>
                            
                            </div>
                        )
                    })}
                   
                     {(this.props.examNotes && (this.props.examNotes.chiefComplaintVal || this.props.examNotes.subjectiveVal || this.props.examNotes.surgeryVal
                     ||this.props.examNotes.objectiveAssessmentVal ||  this.props.examNotes.overallDiagnosisVal ||this.props.examNotes.planTreatmentGoalsVal ||
                     this.props.examNotes.indicationsNeedVal || this.props.examNotes.treatmentGoalsForVal)) && 
                     <div>   
                        <h4 className="title" >Exam Notes</h4>
                        <p className="paragraph mt-2 mb-4"><b>Chief Complaint:</b> <p className = "description">{this.props.examNotes.chiefComplaintVal}</p> </p>
                        <p className="paragraph mt-2 mb-4"><b>Subjective:</b> <p className = "description">{this.props.examNotes.subjectiveVal}</p> </p>
                        <p className="paragraph mt-2 mb-4"><b>Surgery:</b> <p className = "description">{this.props.examNotes.surgeryVal}</p> </p>
                        <p className="paragraph mt-2 mb-4"><b>ObjectiveAssessment:</b> <p className = "description">{this.props.examNotes.objectiveAssessmentVal}</p> </p>
                        <p className="paragraph mt-2 mb-4"><b>Overall Diagnosis:</b> <p className = "description">{this.props.examNotes.overallDiagnosisVal}</p> </p>
                        <p className="paragraph mt-2 mb-4"><b>Plan Treatment and Goals:</b> <p className = "description">{this.props.examNotes.planTreatmentGoalsVal}</p> </p>
                        <p className="paragraph mt-2 mb-4"><b>Indications Need:</b> <p className = "description">{this.props.examNotes.indicationsNeedVal}</p> </p>
                        <p className="paragraph mt-2 mb-4"><b>Treatment Goals For:</b> <p className = "description">{this.props.examNotes.treatmentGoalsForVal}</p> </p>
                    </div>
                }
                </div>
            </div>
        );
    }
    
}
export default PdfTemplate;
