
import {Component, OnInit, ViewChild} from '@angular/core';
import {GestionClientsService} from '../../../services/gestionClients.service';
import {AfterViewInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {LoginService} from '../../../services/login.service';
import {MatPaginator} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-clients-non-valides',
  templateUrl: './clients-non-valides.component.html',
  styleUrls: ['./clients-non-valides.component.css']
})
export class ClientsNonValidesComponent implements OnInit {
  constructor(public gestionClient: GestionClientsService, private router: Router, private route: ActivatedRoute) { }
  displayedColumns: string[] = ['id_client', 'nom_client', 'categorie_client', 'zone', 'consulter et valider', 'delete'];
  nombre_de_client_a_ajoutee : any;
  login: any;
  choix: any;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource(this.gestionClient.clients_non_valides) ;
  /*ngAfterViewInit() {
    setTimeout(
      () => {
        this.dataSource.paginator = this.paginator; }, 0
    );
  }*/

  ngOnInit(): void {
    this.gestionClient.getClients();

    setTimeout(
      () => {
        this.nombre_de_client_a_ajoutee = this.gestionClient.clients_non_valides.length;
        this.dataSource = new MatTableDataSource(this.gestionClient.clients_non_valides) ;
        this.dataSource.paginator = this.paginator; }, 10
    );
  }
  retour(){

  }

  OnConsulter_valider(id: number){
    console.log(id);
    //this.gestionClient.validation = true;
    this.gestionClient.getClient_a_valider(id);
    this.router.navigate(['/Edition-consultation-client'], {relativeTo: this.route});
  }
  OnSupprimer(id: number){
    this.gestionClient.Supprimer_client(id);
    setTimeout(
      () => {
        this.nombre_de_client_a_ajoutee = this.gestionClient.clients_non_valides.length;
        this.dataSource = new MatTableDataSource(this.gestionClient.clients_valides) ;
        this.dataSource.paginator = this.paginator; }, 10
    );
    /*this.gestionClient.delete_client(id);*/
   // this.router.navigate(['/gestion-des-clients'], {relativeTo: this.route});
  }

  appliquerfilter(filtervalue: string){
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
  }
}

