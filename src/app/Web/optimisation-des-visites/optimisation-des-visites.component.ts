import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {OptimisationService} from "../../services/optimisation.service";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {formatDate} from "@angular/common";
import {DialogClientComponent} from "../commandes/dialog-client/dialog-client.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogMapComponent} from "./dialog-map/dialog-map.component";
import {DialogArticleComponent} from "../articles/dialog-ajouter-article/dialog-article.component";
import {DialogColisComponent} from "./dialog-colis/dialog-colis.component";
import {DialogFichierJointeVisitesComponent} from "./dialog-fichier-jointe-visites/dialog-fichier-jointe-visites.component";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-optimisation-des-visites',
  templateUrl: './optimisation-des-visites.component.html',
  styleUrls: ['./optimisation-des-visites.component.css']
})
export class OptimisationDesVisitesComponent implements OnInit, AfterViewInit {
  idcommercial = undefined;
  filtrage: any;
  accueil = true;
  statuss = false;
  // tslint:disable-next-line:variable-name
  affectation_manuelle = false;
  // tslint:disable-next-line:variable-name
  algorithme_de_selection = false;
  constructor( public dialog: MatDialog, public optimisationService: OptimisationService) { }
  displayedColumns: string[] = ['N.o', 'commercial', 'client', 'zone', 'date', 'status', 'colis', 'Consulter' ];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource([]) ;
  //filtrage: any;
  ngOnInit(): void {
    // @ts-ignore
    this.dataSource.data = [];
    setTimeout(
      () => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 10);

  }
  ngAfterViewInit(): void {

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
              visite.nom_commercial = this.optimisationService.getNomCommercial(visite.idCommercial);
              visite.zone = this.optimisationService.getZone(visite.idClient);
            }
            console.log(this.optimisationService.visites);
            this.dataSource.data = this.optimisationService.visites;
            setTimeout(
              () => {
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort; }, 500);
          }, error => {console.log(error.message); });
      }, error => {console.log(error.message); });
    this.optimisationService.getZones()
      .subscribe(data => {
        this.optimisationService.zones = data;
      }, error => {console.log(error.message); });
    // this.optimisationService.codePrincipale(0.5);
  }
  affectation_manuelle1(): void{
    this.algorithme_de_selection = false;
    this.accueil = false;
    this.affectation_manuelle = true;
  }
  accueil1(): void{
    this.algorithme_de_selection = false;
    this.affectation_manuelle = false;
    this.accueil = true;
  }
  algorithme_de_selection1(): void{
    this.accueil = false;
    this.affectation_manuelle = false;
    this.algorithme_de_selection = true;
  }
  openDialog(data1: any): void{
    // tslint:disable-next-line:max-line-length
    this.dialog.open(DialogMapComponent, {data: data1});
  }
  openDialogColi(id: number): void{
    this.dialog.open(DialogColisComponent, {data: id , height: '700px',
      width: '1300px'});

  }
  openDialogPieceJointe(idd: any): void{
    console.log(idd);
    this.dialog.open(DialogFichierJointeVisitesComponent, {data: {id: idd} , height: '500px',
      width: '800px'});

  }
  getPosition(id: any): any{
    for (const client of this.optimisationService.clients){
      if (client.idClient === id){
        return {lat: client.lat, lng: client.lng, nom_client: client.nom_client, code: client.code};
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

  getVisitesCommercialDate(f: NgForm): any{
    this.optimisationService.getVisitesCommercialDate(f)
      .subscribe(data => {
        this.optimisationService.visites = data;
        for (const visite of this.optimisationService.visites){
          visite.nom_client = this.optimisationService.getNomClient(visite.idClient);
          visite.nom_commercial = this.optimisationService.getNomCommercial(visite.idCommercial);
          visite.zone = this.optimisationService.getZone(visite.idClient);
        }
        console.log(this.optimisationService.visites);
        this.dataSource = new MatTableDataSource(this.optimisationService.visites);
        setTimeout(
          () => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort; }, 100);
      }, error => {console.log(error.message); });

  }
  getClientDeVisite(f: NgForm): any{
    this.statuss = false;
    const idCommercial = f.value.idCommercial;
    let date = f.value.date;
    console.log(idCommercial, date);
    if ((  idCommercial !== undefined) && date !== '' && date !== null){

      date = formatDate(date, 'yyyy-MM-dd', 'en-US');
      let visites = this.optimisationService.visites;
      // @ts-ignore
      visites =  this.optimisationService.visites.filter(visite => (Number(visite.idCommercial) === Number(idCommercial) && visite.date === date));
      this.dataSource = new MatTableDataSource(visites) ;
      setTimeout(
        () => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort; }, 10);
    }
    else {
      let visites;
      if (idCommercial !== undefined ) {
        // @ts-ignore
        visites =  this.optimisationService.visites.filter(visite1 => Number(visite1.idCommercial) === Number(idCommercial));
        this.dataSource = new MatTableDataSource(visites) ;
        setTimeout(
          () => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort; }, 10);
      }
      else {
        console.log(idCommercial, date);

        if (date !== ''){
          if (idCommercial === undefined && date === null ){
            this.dataSource = new MatTableDataSource(this.optimisationService.visites) ;
            setTimeout(
              () => {
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort; }, 10);
          }
          else {
            date = formatDate(date, 'yyyy-MM-dd', 'en-US');
            // @ts-ignore
            visites =  this.optimisationService.visites.filter(visite =>  visite.date === date);
            this.dataSource = new MatTableDataSource(visites) ;
            setTimeout(
              () => {
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort; }, 10); }
        }
        else {


          this.dataSource = new MatTableDataSource(this.optimisationService.visites) ;
          setTimeout(
            () => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;}, 10);
        }
      }
    }
  }
  appliquerfilter(filtervalue: string): any{
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
    setTimeout(
      () => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort; }, 100);
  }
  filtreVisiteTermine(status: any): any{
    // @ts-ignore
    this.dataSource.data = this.optimisationService.visites.filter(visite => visite.status === status);
    setTimeout(
      () => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort; }, 100);
  }


}
