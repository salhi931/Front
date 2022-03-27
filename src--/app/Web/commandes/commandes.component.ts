import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
 import {GestionDesCommandesService} from '../../services/gestion-des-commandes.service';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {GestionDesCommandes2Service} from "../../services/gestion-des-commandes-2.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigurationService} from "../../services/configuration.service";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit, AfterViewInit  {

  constructor(public gestionDesCommandesService: GestionDesCommandesService, public gestionDesCommandes2Service: GestionDesCommandes2Service,
              private router: Router, private route: ActivatedRoute, public configurationService: ConfigurationService) { }
  displayedColumns: string[] = ['num_commande', 'client', 'TTC', 'date_de_lancement', 'status', 'edit', 'suppression'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource([]) ;
  filtrage: any;
  commandes: any[] = [];
  clients: any[] = [];
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.configurationService.getConfiguration();
    //this.gestionDesCommandesService.getClients();
    this.getCommandes();
  }


  getCommandes(): any{
    this.gestionDesCommandesService.getClients()
      .subscribe(data => {
        this.clients = data;
        this.gestionDesCommandesService.getCommandes()
          .subscribe(data1 => {
            this.commandes = data1;
            for (const commande of this.commandes) {
              commande.nom = this.getClient(commande.id_client);
            }
            // @ts-ignore
            this.dataSource = new MatTableDataSource(this.commandes) ;
            setTimeout(
              () => {
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }, 10);
          }, error => {alert('une error s\'est produite'); });
      });

  }

  appliquerfilter(filtervalue: string): any{
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
  }

  onModifier(id: any): any{
    this.gestionDesCommandes2Service.id_commande = id;
    //console.log(this.gestionDesCommandes2Service.id_commande);
    setTimeout(
      () => {
        this.gestionDesCommandes2Service.getcommandeanddetailcommane(id);
        this.gestionDesCommandes2Service.commercial_id_selected = String('1');
        }, 100
    );



  }

  // tslint:disable-next-line:variable-name
  onSupprimer(id: number): any{
    this.gestionDesCommandesService.supprimer(id);

  }
  getClient(id: any): any{
    for ( const client of this.clients){
      if ( client.idClient === id){
        return client.nom_client;
      }
    }
  }

  OnchangeStatusCommande(id: any, element: any): void{
    console.log(id);
    console.log(element);
    this.gestionDesCommandesService.changestatuscommande(id, element);
  }
}
