import { Component, OnInit } from '@angular/core';
import {ReportingService} from '../../../services/reporting.service';
import {FormControl, NgForm} from '@angular/forms';
import {DatePipe, formatDate} from '@angular/common';
import {ConfigurationService} from "../../../services/configuration.service";

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  // factures123 = [{nomClient: 'Houssam', zone: 'Rabat', nomCommercial: 'ahmed', nomArticle: 'ATICA TABLE ', famille: null, prix: 144.0, quantite: 12, date: '2021-05-12'}, {nomClient: 'Houssam', zone: 'Rabat', nomCommercial: 'mustapha', nomArticle: 'Pyjama ', famille: null, prix: 142.0, quantite: 12, date: '2021-05-12'}, {nomClient: 'jamal', zone: 'Tanger', nomCommercial: 'khalid', nomArticle: 'ATICA TABLE ', famille: null, prix: 144.0, quantite: 12, date: '2021-05-12'}, {nomClient: 'jamal', zone: 'Tanger', nomCommercial: 'achref', nomArticle: 'Pyjama ', famille: null, prix: 0.0, quantite: 2, date: '2021-07-10'}, {nomClient: 'jamal', zone: 'Tanger', nomCommercial: 'ahmed', nomArticle: 'ATICA TABLE ', famille: null, prix: 144.0, quantite: 12, date: '2021-07-12'}, {nomClient: 'jamal', zone: 'Tanger', nomCommercial: 'mustapha', nomArticle: ' Women\'s Lexington  Bracelet', famille: null, prix: 80.0, quantite: 0, date: '2021-07-12'}, {nomClient: 'jamal', zone: 'Tanger', nomCommercial: 'mustapha', nomArticle: ' Women\'s Lexington  Bracelet', famille: null, prix: 200.0, quantite: 6, date: '2021-07-12'}, {nomClient: 'jamal', zone: 'Tanger', nomCommercial: 'mustapha', nomArticle: ' Women\'s Lexington  Bracelet', famille: null, prix: 2121.0, quantite: 12, date: '2021-07-12'}, {nomClient: 'jamal', zone: 'Tanger', nomCommercial: 'mustapha', nomArticle: 'Pyjama ', famille: null, prix: 24.0, quantite: 2, date: '2021-07-12'}, {nomClient: 'Mohamed', zone: null, nomCommercial: null, nomArticle: null, famille: null, prix: 0.0, quantite: 0, date: null}, {nomClient: 'ahmed', zone: null, nomCommercial: null, nomArticle: null, famille: null, prix: 0.0, quantite: 0, date: null}];
  public chartType = 'line';
  // monthInputCtrl: FormControl = new FormControl(new Date(2020, 0, 1));
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
  ];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public chartDatasets: Array<any> = [];

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true
  };

  constructor(public reportingService: ReportingService, public datepipe: DatePipe, public configurationService: ConfigurationService) { }

  ngOnInit(): void {
    this.reportingService.reportingFacture = [];
    this.reportingService.reportingRetours = [];
    setTimeout (() => {
      this.reportingChiffreDaffaire();
    }, 1000 );
  }

  getReportingZone(f: any): any{
    const Zone = f.zone;
    // @ts-ignore
    const FactureReporting = this.reportingService.reportingFacture.filter(facture => String(facture.zone) === String(Zone));
    // @ts-ignore
    const alldates = FactureReporting.map(res => res.date);
    // @ts-ignore
    const quantite = FactureReporting.map(res => res.prix);
    this.reportingService.nettoyerListZone(alldates, quantite);
    this.reportingService.triListZone(alldates, quantite);
    // @ts-ignore
    const RetoursReporting = this.reportingService.reportingRetours.filter(retour => String(retour.zone) === String(Zone));
    // @ts-ignore
    const alldates2 = RetoursReporting.map(res2 => res2.date);
    // @ts-ignore
    const quantite2 = RetoursReporting.map(res => res.prix);
     // @ts-ignore
    this.reportingService.nettoyerListZone(alldates2, quantite2);
    this.reportingService.triListZone(alldates2, quantite2);
    const Reponse = this.reportingService.fusion(alldates, alldates2, quantite, quantite2);
    const profit = this.reportingService.profit(Reponse[1], Reponse[2]);
    this.chartLabels = Reponse[0];
    this.chartDatasets = [
      { data: profit, label: 'chiffre d\'affaire' },
      { data: Reponse[1], label: 'Prix * quantité vendues' },
      { data: Reponse[2], label: 'Prix * quantité retournée' }
    ];
  }
  public chartClicked(e: any): void {  }
  public chartHovered(e: any): void {  }

  reportingChiffreDaffaire(): any{
        const FactureReporting = this.reportingService.reportingFacture;
        const RetoursReporting = this.reportingService.reportingRetours;
        const chiffresZone = [];
        const zones = [];
        for (const facture of FactureReporting){
              const zone = facture.zone;
              let chiffres = 0;
               // tslint:disable-next-line:no-shadowed-variable
              const test = zones.filter(zone => String(zone) ===  String(facture.zone));
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
              if (zone !== null && test.length === 0){
                zones.push(zone);
                chiffresZone.push(chiffres);
              }
            }
              // @ts-ignore
        this.barChartData = [{data: chiffresZone, label: 'Chiffres d\'affaire'}];
            // @ts-ignore
        this.barChartLabels = zones;
  }
  onSubmit(f: NgForm): any{
    // tslint:disable-next-line:variable-name
    const dateDebut = this.datepipe.transform(f.value.dateDebut, 'yyyy-MM-dd');
    // tslint:disable-next-line:variable-name
    const dateFin = this.datepipe.transform(f.value.dateFin, 'yyyy-MM-dd');
    this.reportingService.getreportingFacture(dateDebut, dateFin)
      .subscribe(data => {
        this.reportingService.reportingFacture = data;
        console.log(data);
        this.reportingService.getreportingRetours(dateDebut, dateFin)
          .subscribe(data2 => {
            this.reportingService.reportingRetours = data2;
            this.reportingChiffreDaffaire();
          }, error => {console.log(error.message); });

      }, error => {console.log(error.message); });
  }
}
