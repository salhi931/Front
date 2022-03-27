import { Component, OnInit } from '@angular/core';
import {ReportingService} from '../../../services/reporting.service';
import {DatePipe} from '@angular/common';
import {ConfigurationService} from '../../../services/configuration.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-clients-reporting',
  templateUrl: './clients-reporting.component.html',
  styleUrls: ['./clients-reporting.component.css']
})
export class ClientsReportingComponent implements OnInit {
  zone: any;
  detail1 = true;
  pieChartLabels = []; // decorate the property with @Input()
  pieChartData = []; // decorate the property with @Input()
  public pieChartType = 'pie';
  public doughnutChartLabels = [];
  public doughnutChartData = [];
  public doughnutChartType = 'doughnut';
  constructor(public reportingService: ReportingService, public datepipe: DatePipe, public configurationService: ConfigurationService) { }

  ngOnInit(): void {
  }
  getReportingZone(f: any): any{
    this.reportingChiffreDesClients(f.zone);
    console.log(f);
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
            console.log(data);
            this.reportingChiffreDesClients(undefined);
          }, error => {console.log(error.message); });

      }, error => {console.log(error.message); });
  }
  details1(): any{
    this.detail1 = !this.detail1;
  }
  // tslint:disable-next-line:no-unnecessary-initializer
   reportingChiffreDesClients(zone: any = undefined): any{
    if (zone === 'toutes les zones' || zone === null || zone === undefined   ) {zone = undefined; }
    const FactureReporting = this.reportingService.reportingFacture;
    const RetoursReporting = this.reportingService.reportingRetours;
    const chiffresClientCategories = [];
    const Categories = [];
    for (const facture of FactureReporting){
       const Categorie = facture.categorieClient;
      let chiffres = 0;
      // tslint:disable-next-line:no-shadowed-variable
      const test = Categories.filter(categorieClient1 => String(categorieClient1) ===  String(facture.categorieClient));
      if (test.length === 0){
        for (const facture2 of FactureReporting){
           if (zone !== null && zone !== undefined){
            if (Categorie === facture2.categorieClient && facture2.zone === zone){
              chiffres += facture2.prix;
            }
          }
          else {
            if (Categorie === facture2.categorieClient){
              chiffres += facture2.prix;
            }
          }
        }
        for (const retour of RetoursReporting){

          if (zone !== null && zone !== undefined){
            if (Categorie === retour.categorieClient && retour.zone === zone){
              chiffres += retour.prix;
            }
          }
          else {
            if (Categorie === retour.categorieClient){
              chiffres += retour.prix;
            }
          }
        }
      }
       if (Categorie !== null && test.length === 0){
        Categories.push(Categorie);
        chiffresClientCategories.push(chiffres);
      }
    }
    // if (!nbrArticle){ nbrArticle = 3; }
    console.log('1');

    if (true){
      // console.log('2');
      const list1 = this.reportingService.triListCommerciaux(chiffresClientCategories, Categories);
      const list = this.reportingService.tri(list1[0], list1[1], 6);
      // @ts-ignore
      /*this.barChartData = [{data: list[0], label: 'Chiffres d\'affaire'}];
      // @ts-ignore
      this.barChartLabels = list[1];
      // @ts-ignore
      this.datax = this.barChartData[0].data;*/
      this.pieChartData = list[0];
      this.pieChartLabels = list[1];
      this.doughnutChartData = list[0];
      this.doughnutChartLabels = list[1];
      console.log('3');
    }
  }
}
