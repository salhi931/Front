import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {GestionClientsService} from '../../services/gestionClients.service';
import {AfterViewInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {LoginService} from '../../services/login.service';
import {MatPaginator} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {LoaderService} from '../../services/loader.service';
import {DialogFichierJointeVisitesComponent} from "../optimisation-des-visites/dialog-fichier-jointe-visites/dialog-fichier-jointe-visites.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogFeedbackComponent} from "./dialog-feedback/dialog-feedback.component";
import {MatSort} from "@angular/material/sort";
 @Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, AfterViewInit   {
  constructor( private changeDetectorRef: ChangeDetectorRef, public dialog: MatDialog, public gestionClient: GestionClientsService, private router: Router, private route: ActivatedRoute) { }
  displayedColumns: string[] = ['id_client', 'nom_client', 'categorie_client', 'zone', 'GPS', 'edit' , 'feedback', 'delete'];
   // tslint:disable-next-line:variable-name
  nombre_de_client_a_ajoutee: any;
  login: any;
  choixCode: any;
  filtrage: any;
  statuss: any = false;
  choixNom: any;
  choixCategorie: any;
  clients: any = [];
  ClientsBigdata: any;
  zones: any = [];
   // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
   @ViewChild(MatSort) sort: MatSort;
  // @ts-ignore
  dataSource = new MatTableDataSource([]) ;

  /*ngAfterViewInit() {
    setTimeout(
      () => {
        this.dataSource.paginator = this.paginator; }, 0
    );
  }*/

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
     this.gestionClient.getCategorieClientReturn()
       .subscribe(data => {
         this.gestionClient.CategorieClient = data;
         this.gestionClient.getzoness()
           .subscribe(data2 => {
             this.zones = data2;
             this.getClient();
           }, error => {alert(error.message); });
       }, error => {alert(error.message); });
   }
   filtreVisiteTermine(status: any): any {
     if (Number(status) === 1){
       // @ts-ignore
       this.dataSource.data = this.clients.filter(client => client.Gps === true);
     }
     else {
       if (Number(status) === 2){
         // @ts-ignore
         this.dataSource.data = this.clients.filter(client => client.Gps === false);
       }
       else {
         this.dataSource.data = this.clients;
       }
     }
     // @ts-ignore

     setTimeout(
       () => {
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
       }, 100);
   }
   rechercheClient(): void{
      if (this.choixCode !== undefined && this.choixCode !== '') {
        this.gestionClient.ClientsByCode(this.choixCode)
          .subscribe(data => {
            this.clients = data;
            for (const client of this.clients) {
              client.zonee = this.getZone(client.zone);
              client.categorie_clientName = this.getCategorie(client.categorie_client);
              if (Number(client.lat) !== 0 || Number(client.lng) !== 0){
                client.Gps = true;
              }
              else{
                client.Gps = false;
              }
            }
            this.gestionClient.getClientvalidandnonvalid(this.clients);
            // @ts-ignore
            this.dataSource.data = this.gestionClient.clients_valides;
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }, 100) ;
            console.log(data);
            //this.dataSource = new MatTableDataSource<object>()
          });
      }
      else {
        this.ngAfterViewInit();

      }
   }


  getClient(): any{
    this.gestionClient.getClients().subscribe(data => {
      this.clients = data;
      console.log(data);
      this.gestionClient.clients = data;
      for (const client of this.clients) {
        client.zonee = this.getZone(client.zone);
        client.categorie_clientName = this.getCategorie(client.categorie_client);
        if (Number(client.lat) !== 0 || Number(client.lng) !== 0){
          client.Gps = true;
        }
        else{
          client.Gps = false;
        }
      }
      this.gestionClient.getClientvalidandnonvalid(this.clients);
     // console.log(this.gestionClient.clients_valides);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      // this.dataSource = new MatTableDataSource(this.gestionClient.clients_valides) ;
      // @ts-ignore
      this.dataSource.data = this.gestionClient.clients_valides;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 100) ;

    });
  }

  OnModifier(id: number): any{
    console.log(id);
    this.gestionClient.getClient_consultee(id);
  }
  OnSupprimer(id: number): void{
    this.gestionClient.Supprimer_client(id);
    setTimeout(
      () => {
        this.nombre_de_client_a_ajoutee = this.gestionClient.clients_non_valides.length;
        // @ts-ignore
        this.dataSource = new MatTableDataSource(this.gestionClient.clients_valides) ;
        this.dataSource.paginator = this.paginator; }, 10
    );
    /*this.gestionClient.delete_client(id);*/
    this.router.navigate(['/gestion-des-clients'], {relativeTo: this.route});
  }
  nouveauClient(): void{
    this.router.navigate(['/Ajouter-clients'], {relativeTo: this.route});

  }

  appliquerfilter(filtervalue: string): void{
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
  }
   /*AfficherClients_non_valider(){
    console.log('test');
     this.nombre_de_client_a_ajoutee = 0;
     this.router.navigate(['/clients-non-valides'], {relativeTo: this.route});

   }*/
   getcolor(i: number): any{
     if (i % 2 === 0){
       return '#DCDCDC';
     }
     else {
       return '#F5F5F5';
     }
   }
   getZone(id: any): any{
     for ( const zone of this.zones){
       if ( zone.id === id){
         return zone.zone;
       }
     }
   }
   getCategorie(id: any): any{
     for ( const cat of this.gestionClient.CategorieClient){
       if ( cat.id === id){
         return cat.categorie;
       }
     }
   }
   feedBack(idd: any): any{

       console.log(idd);
       this.dialog.open(DialogFeedbackComponent, {data: {id: idd} , height: '700px',
         width: '1300px'});


   }
}
