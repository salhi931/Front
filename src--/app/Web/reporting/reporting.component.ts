import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import {ReportingService} from "../../services/reporting.service";
import { Chart } from 'chart.js';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {
  bars: any = false;
  doughnuts: any = false;
  zones: any = false;
  articles: any = false;


  // -----------------------------------------------------------------------------------------------------
  // Bar Chart
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
  ];
  // -----------------------------------------------------------------------------------------------------
  // Doughnut Chart
  public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';
  // -----------------------------------------------------------------------------------------------------
  // Radar Chart
  public radarChartLabels = ['Q1', 'Q2', 'Q3', 'Q4', 'Q4'];
  public radarChartData = [];
  public radarChartType = 'radar';
  // -----------------------------------------------------------------------------------------------------
  // Pie Chart
  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartType = 'pie';
   charts: any;
  constructor(public reportingService: ReportingService) { }
  ngOnInit() {
    //this.reportingService.getreportingRetours();
    this.reportingService.getzones();
    this.reportingService.getFamille();
    //this.reportingService.getreportingFacture();
    this.reportingService.getreportingCommande();
    // this.reportingCommande();
    // this.reportingChiffreDaffaire();
  }

  bar(): any{
    this.bars = true;
    this.doughnuts = false;
    this.zones = false;
    this.articles = false;
  }
  doughnut(): any{
    this.bars = false;
    this.doughnuts = true;
    this.zones = false;
    this.articles = false;
  }
  radar(): any{
    this.bars = false;
    this.doughnuts = false;
    this.zones = true;
    this.articles = false;
  }
  pie(): any{
    this.bars = false;
    this.doughnuts = false;
    this.zones = false;
    this.articles = true;
  }
}
