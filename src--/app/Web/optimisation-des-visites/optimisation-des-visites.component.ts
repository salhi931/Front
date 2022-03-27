import {Component, OnInit, ViewChild} from '@angular/core';
import {OptimisationService} from "../../services/optimisation.service";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {formatDate} from "@angular/common";
import {DialogClientComponent} from "../commandes/dialog-client/dialog-client.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogMapComponent} from "./dialog-map/dialog-map.component";

@Component({
  selector: 'app-optimisation-des-visites',
  templateUrl: './optimisation-des-visites.component.html',
  styleUrls: ['./optimisation-des-visites.component.css']
})
export class OptimisationDesVisitesComponent implements OnInit {
  idcommercial = undefined;
  constructor( public dialog: MatDialog, public optimisationService: OptimisationService) { }
  displayedColumns: string[] = ['N.o', 'commercial', 'client', 'date' ];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource([]) ;
  //filtrage: any;
  ngOnInit(): void {

    this.optimisationService.getCommericaux()
      .subscribe(data => {
        this.optimisationService.commerciaux = data;
      }, error => {console.log(error.message); });
    this.optimisationService.getClients()
      .subscribe(data1 => {
        this.optimisationService.clients = data1;
        this.optimisationService.getVisites()
          .subscribe(data => {
            this.optimisationService.visites = data;
            for (const visite of this.optimisationService.visites){
              visite.nom_client = this.optimisationService.getNomClient(visite.idClient);
            }
            this.dataSource = new MatTableDataSource(this.optimisationService.visites);
            setTimeout(
              () => {
                this.dataSource.paginator = this.paginator; }, 10);
          }, error => {console.log(error.message); });
      }, error => {console.log(error.message); });
    this.optimisationService.getZones()
      .subscribe(data => {
        this.optimisationService.zones = data;
      }, error => {console.log(error.message); });
    this.optimisationService.codePrincipale();
  }
  openDialog(data1: any): void{
    // tslint:disable-next-line:max-line-length
    this.dialog.open(DialogMapComponent, {data: data1});
  }
  getPosition(id: any): any{
    for (const client of this.optimisationService.clients){
      if (client.idClient === id){
        return {lat: client.lat, lng: client.lng, nom_client: client.nom_client};
      }
    }
    return {};
  }
  afficherLaMap(): any{
    const data = [];
    console.log(this.dataSource.filteredData);
    for (const visite of this.dataSource.filteredData){
      // @ts-ignore
      data.push(this.getPosition(visite.idClient));
    }
    console.log(data);
    this.openDialog(data);
  }
  onSubmitt(f: NgForm): any{
    const idCommercial = f.value.idCommercial;
    const date = f.value.date;
    console.log(date);
    // @ts-ignore
    const clients = this.dataSource.filteredData.filter( client => client.statuss === true);
    this.optimisationService.enregistrerVisites(idCommercial, date, clients);

  }

  getClientDeVisite(f: NgForm): any{
    const idCommercial = f.value.idCommercial;
    let date = f.value.date;
    console.log(idCommercial, date);
    if ((  idCommercial !== undefined) && date !== '' && date !== null){

      date = formatDate(date, 'yyyy-MM-dd', 'en-US');
      let visites = this.optimisationService.visites;
      // @ts-ignore
      visites = visites.filter(visite => (Number(visite.idCommercial) === Number(idCommercial) && visite.date === date));
      this.dataSource = new MatTableDataSource(visites) ;
      setTimeout(
        () => {
          this.dataSource.paginator = this.paginator; }, 10);
    }
    else {
      let visites = this.optimisationService.visites;
      if (idCommercial !== undefined ) {
        // @ts-ignore
        visites = visites.filter(visite1 => Number(visite1.idCommercial) === Number(idCommercial));
        this.dataSource = new MatTableDataSource(visites) ;
        setTimeout(
          () => {
            this.dataSource.paginator = this.paginator; }, 10);
      }
      else {
        console.log(idCommercial, date);

        if (date !== ''){
          if (idCommercial === undefined && date === null ){
            this.dataSource = new MatTableDataSource(this.optimisationService.visites) ;
            setTimeout(
              () => {
                this.dataSource.paginator = this.paginator; }, 10);
          }
          else {
          date = formatDate(date, 'yyyy-MM-dd', 'en-US');
          // @ts-ignore
          visites = visites.filter(visite =>  visite.date === date);
          this.dataSource = new MatTableDataSource(visites) ;
          setTimeout(
            () => {
              this.dataSource.paginator = this.paginator; }, 10);}
        }
        else {


            this.dataSource = new MatTableDataSource(this.optimisationService.visites) ;
            setTimeout(
              () => {
                this.dataSource.paginator = this.paginator; }, 10);
        }
      }
    }
  }

}
