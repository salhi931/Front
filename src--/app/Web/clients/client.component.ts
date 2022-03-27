import {Component, OnInit, ViewChild} from '@angular/core';
import {GestionClientsService} from '../../services/gestionClients.service';
import {AfterViewInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {LoginService} from '../../services/login.service';
import {MatPaginator} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {LoaderService} from '../../services/loader.service';
 @Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit  {
  constructor(public gestionClient: GestionClientsService, private router: Router, private route: ActivatedRoute) { }
  displayedColumns: string[] = ['id_client', 'nom_client', 'categorie_client', 'zone', 'edit', 'delete'];
  nombre_de_client_a_ajoutee : any;
  login: any;
  choix: any;
  clients: any = [];
   // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource(this.gestionClient.clients_valides) ;
  /*ngAfterViewInit() {
    setTimeout(
      () => {
        this.dataSource.paginator = this.paginator; }, 0
    );
  }*/

  ngOnInit(): void {
    this.getClient();
  }
  getClient(){
    this.gestionClient.getClients().subscribe(data => {
      this.clients = data;
      this.gestionClient.getClientvalidandnonvalid(this.clients);
      this.dataSource = new MatTableDataSource(this.gestionClient.clients_valides) ;
      setTimeout(
        () => {
          this.dataSource.paginator = this.paginator; }, 10);    });
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
   getcolor(i: number){
     if (i % 2 === 0){
       return '#DCDCDC';
     }
     else {
       return '#F5F5F5';
     }
   }
}
