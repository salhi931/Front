import {Component, Input, OnInit} from '@angular/core';
import {ReportingService} from '../../../services/reporting.service';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {ConfigurationService} from "../../../services/configuration.service";

@Component({
  selector: 'app-articles-reporting',
  templateUrl: './articles-reporting.component.html',
  styleUrls: ['./articles-reporting.component.css']
})
export class ArticlesReportingComponent implements OnInit {
  pieChartLabels = []; // decorate the property with @Input()
  pieChartData = []; // decorate the property with @Input()
  public pieChartType = 'pie';
  detail1 = true;
  detail2 = true;

  public doughnutChartLabels = [];
  public doughnutChartData = [];
  public doughnutChartType = 'doughnut';


  zone: any;
  constructor(public reportingService: ReportingService, public datepipe: DatePipe, public configurationService: ConfigurationService) { }

  ngOnInit(): void {
    this.reportingService.reportingFacture = [];
    this.reportingService.reportingRetours = [];
    this.zone = 'toutes les zones-reporting';
    //this.getReportingZone({zone: this.zone});
  }
  public details1(): void {  this.detail1 = !this.detail1; }
  public details2(): void {  this.detail2 = !this.detail2; }

  getReportingZone(f: any): any{
    console.log(f.famille);
    this.reportingarticlesFacture(f.zone, f.nbrArticle, f.famille );
    this.reportingarticlesretours(f.zone, f.nbrArticle, f.famille );

  }
  reportingarticlesFacture(zone: any, n: number = 999999, famille: any): any{
    this.pieChartLabels = [];
    if (zone === 'toutes les zones-reporting') {zone = undefined; }
    // console.log(this.reportingService.reportingFacture);
    // @ts-ignore
    this.pieChartData = [];
    const quantite = [];
        // @ts-ignore
    const articles = [];
    const reportingFacture = this.reportingService.reportingFacture;
    console.log(reportingFacture);
    for (const res1 of reportingFacture){
          const article = res1.famille;
          let quantitee = 0;
          // @ts-ignore
          // tslint:disable-next-line:no-shadowed-variable
          const test = articles.filter(article => article === res1.famille);
          if (test.length === 0){
            for (const res12 of reportingFacture){
              if (zone !== null && zone !== undefined){
                if (article === res12.famille && res12.zone === zone && res12.famille !== null){
                  quantitee += res12.quantite;
                  // console.log(zone, res12.zone);
                }
              }
              else {
                if (article === res12.famille && res12.famille !== null){
                  quantitee += res12.quantite;
                }
              }

            }
          }
          if (quantitee > 0) {
            quantite.push(quantitee);
            articles.push(article);
          }
        }
        // @ts-ignore
    this.pieChartLabels = articles;
        // @ts-ignore
    this.pieChartData = quantite;
    // console.log(quantite, articles);
    if (!n){ n = 3; }
    console.log(quantite, articles);

    const list = this.reportingService.tri(quantite, articles, n);
    this.pieChartData = list[0];
    this.pieChartLabels = list[1];

  }

  reportingarticlesretours(zone: any, nbrArticle: any = 99999, famille: any): any{
    const quantite = [];
    if (zone === 'toutes les zones-reporting') {zone = undefined; }
        // @ts-ignore
    const articles = [];
    const reportingRetours = this.reportingService.reportingRetours;
    /*if (famille !== null && famille !== undefined) { // @ts-ignore
      reportingRetours = this.reportingService.reportingRetours.filter(facture => facture.famille === famille);
      console.log(reportingRetours);
    }*/
    for (const res1 of reportingRetours){
          const article = res1.famille;
          let quantitee = 0;
          // @ts-ignore
          // tslint:disable-next-line:no-shadowed-variable
          const test = articles.filter(article => article === res1.famille);
          if (test.length === 0){
            for (const res12 of reportingRetours){
              if (zone !== null && zone !== undefined) {
                if (article === res12.famille && res12.zone === zone && res12.famille !== null) {
                  quantitee += res12.quantite;
                }
              }
              else {
                if (article === res12.famille && res12.famille !== null){
                  quantitee += res12.quantite;
                }
              }
            }
          }
          if (quantitee > 0) {
            quantite.push(quantitee);
            articles.push(article);
          }
        }
    /*alldates.forEach((res) => {
    const jsdate = new Date(res );
    weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric'}));
  });*/
    if (!nbrArticle){ nbrArticle = 3; }
    console.log(quantite, articles);
    const list = this.reportingService.tri(quantite, articles, nbrArticle);
        // @ts-ignore
    this.doughnutChartLabels = list[1];
        // @ts-ignore
     // @ts-ignore
    this.doughnutChartData =  list[0];
   }
   onSubmit(f: NgForm): any{
     // tslint:disable-next-line:variable-name
    const dateDebut = this.datepipe.transform(f.value.dateDebut, 'yyyy-MM-dd');
    // tslint:disable-next-line:variable-name
    const dateFin = this.datepipe.transform(f.value.dateFin, 'yyyy-MM-dd');
    this.reportingService.getreportingFacture(dateDebut, dateFin)
      .subscribe(data => {
        this.reportingService.reportingFacture = data;
        this.reportingService.getreportingRetours(dateDebut, dateFin)
          .subscribe(data2 => {
            this.reportingService.reportingRetours = data2;
            this.getReportingZone(f);
            }, error => {console.log(error.message); });

      }, error => {console.log(error.message); });
   }
}
  /*
  reportingChiffreDaffaire(): any{
    this.reportingService.getreportingFacture()
      .subscribe(data1 => {
        const FactureReporting = data1;
        console.log(data1);
        this.reportingService.getreportingRetours()
          .subscribe(data2 => {
            console.log(data2);
            const RetoursReporting = data2;
            const chiffresZone = [];
            // @ts-ignore
            const zones-reporting = [];
            for (const facture of FactureReporting){
              const zone = facture.zone;
              let chiffres = 0;
              // @ts-ignore
              // tslint:disable-next-line:no-shadowed-variable
              const test = zones-reporting.filter(zone => zone === facture.zone);
              if (test.length === 0){
                for (const facture2 of FactureReporting){
                  if (zone === facture2.zone){
                    chiffres += facture2.prix;
                  }
                }
                for (const retour of RetoursReporting){
                  if (zone === retour.zone){
                    chiffres -= retour.prix;
                  }
                }
              }
              if (zone !== null){
                zones-reporting.push(zone);
                if (chiffres < 0){chiffresZone.push(100); }
                else {chiffresZone.push(chiffres); }
              }
            }
            console.log(zones-reporting);
            console.log(chiffresZone);
            // @ts-ignore
            this.barChartData = [{data: [100, 100]}];
            // @ts-ignore
            this.radarChartLabels = zones-reporting;
            // @ts-ignore
            // @ts-ignore
            this.radarChartData = [{data: chiffresZone, label: '2017'}];
          });
      });
  }*/
