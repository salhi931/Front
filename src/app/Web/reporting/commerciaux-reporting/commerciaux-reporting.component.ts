import { Component, OnInit } from '@angular/core';
import {ReportingService} from "../../../services/reporting.service";
import {DatePipe} from "@angular/common";
import {NgForm} from "@angular/forms";
import {ConfigurationService} from "../../../services/configuration.service";

@Component({
  selector: 'app-commerciaux-reporting',
  templateUrl: './commerciaux-reporting.component.html',
  styleUrls: ['./commerciaux-reporting.component.css']
})
export class CommerciauxReportingComponent implements OnInit {
  zone: any;
  detail = true;
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public datax = [];
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
  }

  public details(): void {  this.detail = !this.detail; }
  public chartClicked(e: any): void {  }
  public chartHovered(e: any): void {  }

  getReportingZone(f: any): any{}
  getReportingCommercial(f: any): any{
    const idCommercial = f.commercial;
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    const FactureReporting = this.reportingService.reportingFacture.filter(facture => Number(facture.idCommercial) === Number(idCommercial));
    console.log(FactureReporting);
    // @ts-ignore
    const alldates = FactureReporting.map(res => res.date);
    // @ts-ignore
    const quantite = FactureReporting.map(res => res.prix);
    this.reportingService.nettoyerListZone(alldates, quantite);
    this.reportingService.triListZone(alldates, quantite);
    // @ts-ignore
    const RetoursReporting = this.reportingService.reportingRetours.filter(retour => Number(retour.idCommercial) === Number(idCommercial));
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
      { data: profit, label: 'chiffre d\'affaire du commercial ' },
      { data: Reponse[1], label: 'Prix * quantité vendues' },
      { data: Reponse[2], label: 'Prix * quantité retournée' }
    ];
  }
  reportingChiffreDaffaireCommerciaux(): any{
    const FactureReporting = this.reportingService.reportingFacture;
    const RetoursReporting = this.reportingService.reportingRetours;
    const chiffresCommerciaux = [];
    const commerciaux = [];
    for (const facture of FactureReporting){
      const nomCommercial = facture.nomCommercial;
      let chiffres = 0;
      // tslint:disable-next-line:no-shadowed-variable
      const test = commerciaux.filter(nomCommercial => String(nomCommercial) ===  String(facture.nomCommercial));
      if (test.length === 0){
        for (const facture2 of FactureReporting){
          if (nomCommercial === facture2.nomCommercial){
            chiffres += facture2.prix;
          }
        }
        for (const retour of RetoursReporting){
          if (nomCommercial === retour.nomCommercial){
            chiffres -= retour.prix;
          }
        }
      }
      if (nomCommercial !== null && test.length === 0){
        commerciaux.push(nomCommercial);
        chiffresCommerciaux.push(chiffres);
      }
    }
    // if (!nbrArticle){ nbrArticle = 3; }
    const list1 = this.reportingService.triListCommerciaux(chiffresCommerciaux, commerciaux);
    const list = this.reportingService.tri(list1[0], list1[1], 6);
    // @ts-ignore
    this.barChartData = [{data: list[0], label: 'Chiffres d\'affaire'}];
    // @ts-ignore
    this.barChartLabels = list[1];
    // @ts-ignore
    this.datax = this.barChartData[0].data;
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
            this.reportingChiffreDaffaireCommerciaux();
          }, error => {console.log(error.message); });

      }, error => {console.log(error.message); });
  }
}

