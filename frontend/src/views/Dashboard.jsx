import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import axios from 'axios';
import { Grid, Row, Col } from "react-bootstrap";
import history from '../utils/history';
import * as url from '../utils/constant';
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import Select from 'react-select';
import '../assets/css/custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.scss';

import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";

class Dashboard extends Component {
  legendPie = {
    names: ["L0650", "L3960", "L3809","L1851","L2397","L1833","L1906","L3916","L1971"],
    types: ["L0650", "L3960", "L3809","L1851","L2397","L1833","L1906","L3916","L1971"]
  };
  state = {
    codePercentageData: [],
    providerGraphData: {},
    physcianGraphData:{},
    DMETP_TBGraphData: {},
    DMETPGraphData:{}, 
    doctors:[],
    doctorDetail:{}
  }

   optionsSalesPhysician = {
    low: 0,
    high: 800,
    showArea: false,
    height: "245px",
    axisX: {
      showGrid: false
    },
   
    lineSmooth: true,
    showLine: true,
    showPoint: true,
    fullWidth: true,
    chartPadding: {
      right: 50
    }
  };

  optionsSalesDMETP_TB = {
    low: 0,
    high: 800,
    showArea: false,
    height: "245px",
    axisX: {
      showGrid: false
    },
   
    lineSmooth: true,
    showLine: true,
    showPoint: true,
    fullWidth: true,
    chartPadding: {
      right: 50
    }
  };

  optionsSalesProvider = {
    low: 0,
    high: 800,
    showArea: false,
    height: "245px",
    axisX: {
      showGrid: false
    },
   
    lineSmooth: true,
    showLine: true,
    showPoint: true,
    fullWidth: true,
    chartPadding: {
      right: 50
    }
  };

  optionsSalesDMETP = {
    low: 0,
    high: 800,
    showArea: false,
    height: "245px",
    axisX: {
      showGrid: false
    },
   
    lineSmooth: true,
    showLine: true,
    showPoint: true,
    fullWidth: true,
    chartPadding: {
      right: 50
    }
  };


  componentDidMount(){
    this.getGraphData();
  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }


  getGraphData(){
    axios.get(url.getGraphDataUrl,
      )
      .then((response) => {
        let labels = [];
        let series = [];
        response.data.cp.map((obj,i)=>{
          labels[i] = obj.code;
          series[i] = obj.percentage;
        });
        let dataPie = {
          labels: labels,
          series: series
        };

        labels = [];
        series = [];
        let physicianValue = 0;
        response.data.PhysicianGraph.map((obj,i)=>{
          labels[i] = obj.code;
          series[i] = obj.percentage;
          physicianValue +=  Number(obj.percentage);
        });
        this.optionsSalesPhysician['high'] = physicianValue;
        let dataPhysician ;
        if(response.data.PhysicianGraph.length > 0 ){
          dataPhysician = {
            series: [series],
            labels: labels,
          };
        }else{
          dataPhysician = {
            series: [['']],
            labels: [''],
          };
        }


        labels = [];
        series = [];
        let providerValue = 0;
        response.data.ProviderGraph.map((obj,i)=>{
          labels[i] = obj.code;
          series[i] = obj.percentage;
          providerValue +=  Number(obj.percentage);
        });
        this.optionsSalesProvider['high'] = providerValue;

        let dataProvider ;
        if(response.data.ProviderGraph.length > 0 ){
          dataProvider = {
            series: [series],
            labels: labels,
          };
        }else{
          dataProvider = {
            series: [['']],
            labels: [''],
          };
        }

        labels = [];
        series = [];
        let DMETPValue = 0;
        response.data.DMETP.map((obj,i)=>{
          labels[i] = obj.code;
          series[i] = obj.percentage;
          DMETPValue += Number(obj.percentage);
        });
        this.optionsSalesDMETP['high'] = DMETPValue;
    
        let dataDMETP ;
        if(response.data.DMETP.length > 0 ){
          dataDMETP = {
            series: [series],
            labels: labels,
          };
        }else{
          dataDMETP = {
            series: [['']],
            labels: [''],
          };
        }


        labels = [];
        series = [];
        let DMETP_TBValue = 0;
        response.data.DMETP_TB.map((obj,i)=>{
          labels[i] = obj.code;
          series[i] = obj.percentage;
          DMETP_TBValue += Number(obj.percentage);
        });
        this.optionsSalesDMETP_TB['high'] = DMETP_TBValue;

        let dataDMETP_TB ;
        if(response.data.DMETP_TB.length > 0 ){
          dataDMETP_TB = {
            series: [series],
            labels: labels,
          };
        }else{
          dataDMETP_TB = {
            series: [['']],
            labels: [''],
          };
        }

        let arr = [];
        response.data.Doctors.map((item)=>{
          let obj = {}
          obj.value = item.id;
          obj.label = item.name;
          arr.push(obj);
        });
        this.setState({
          doctors: arr
        });
       

        this.setState({
          codePercentageData:dataPie,
          providerGraphData:dataProvider,
          physcianGraphData:dataPhysician,
          DMETPGraphData:dataDMETP,
          DMETP_TBGraphData:dataDMETP_TB,
        });
      })
      .catch((error) => {
      })
      .finally(() => {
      });
  }

  getDoctorDetail = (event) => {

    axios.get(url.getDoctorDetailUrl,{
        params: {
          id: event.value,
        }
      }
    ).then((response) => {
      debugger;
      this.setState({
        doctorDetail:response.data,
      })
    })
    .catch((error) => {
    })
    .finally(() => {
    });
  
  }

  render() {
    return (
      <div className="content">
       
      <Grid fluid>
        <Row>
          <Col md={3} >
            <div className="mb-3">
              <p>Doctors</p>
              <Select onChange = {this.getDoctorDetail.bind(this)}  options={this.state.doctors} />
            </div>
          </Col>
        </Row>
        
        <Row>
          {this.state.doctorDetail.length>0 && this.state.doctorDetail.map((item)=>{
                  return(
                    <div>
                    <Col lg={3} sm={6}>
                      <StatsCard
                        bigIcon={<i className="pe-7s-wallet text-success" />}
                        statsText="Total Amount"
                        statsValue={item.amount}
                      />
                    </Col>
                     <Col lg={3} sm={6}>
                     <StatsCard
                       bigIcon={<i className="pe-7s-graph1 text-danger" />}
                       statsText="Total Cases"
                       statsValue={item.case_count}
                     />
                   </Col>
                   </div>

                  )
              })} 
          </Row>
          <Row>
            <Col md={6}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Physician Graph"
                content={
                  <div className="ct-chart">
                    {this.state.physcianGraphData.labels && this.state.physcianGraphData.labels.length>0 && 
                        <ChartistGraph
                        data={this.state.physcianGraphData}
                        type="Line"
                        options={this.optionsSalesPhysician}
                        responsiveOptions={responsiveSales}
                      />
                    }
                  </div>
                }
                
              />
            </Col>
            <Col md={6}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Provider Graph"
                content={
                  <div className="ct-chart">
                  {this.state.providerGraphData.labels && this.state.providerGraphData.labels.length>0 && 
                    <ChartistGraph
                      data={this.state.providerGraphData}
                      type="Line"
                      options={this.optionsSalesProvider}
                      responsiveOptions={responsiveSales}
                    />
                  }
                  </div>
                }
               
              />
            </Col>
          </Row>
    
          <Row>
            <Col md={6}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="DMETP Graph"
                content={
                  <div className="ct-chart">
                    {this.state.DMETPGraphData.labels && this.state.DMETPGraphData.labels.length>0 && 
                      <ChartistGraph
                        data={this.state.DMETPGraphData}
                        type="Line"
                        options={this.optionsSalesDMETP}
                        responsiveOptions={responsiveSales}
                      />
                    }
                  </div>
                }
               
              />
            </Col>
            <Col md={6}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="DMETP TB Graph"
                content={
                  <div className="ct-chart">
                    {this.state.DMETP_TBGraphData.labels && this.state.DMETP_TBGraphData.labels.length>0 && <ChartistGraph
                      data={this.state.DMETP_TBGraphData}
                      type="Line"
                      options={this.optionsSalesDMETP_TB}
                      responsiveOptions={responsiveSales}
                    />
                  }
                  </div>
                }
                
              />
            </Col>
             </Row>
          
          <Row>
               <Col md={12}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Codes Percentages"
                category="Last Campaign Performance"
                stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={this.state.codePercentageData} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(this.legendPie)}</div>
                }
              />
            </Col>
        
          </Row>
          
         
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
