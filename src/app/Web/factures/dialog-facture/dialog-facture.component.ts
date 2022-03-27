import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {GestionDesCommandesService} from '../../../services/gestion-des-commandes.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {GestionDesCommandes2Service} from '../../../services/gestion-des-commandes-2.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-dialog-facture',
  templateUrl: './dialog-facture.component.html',
  styleUrls: ['./dialog-facture.component.css']
})
export class DialogFactureComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public gestionDesCommandesService: GestionDesCommandesService,
              ) { }
  displayedColumns: string[] = ['num_commande', 'client', 'TTC', 'date_de_lancement', 'status', 'edit'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource(this.gestionDesCommandesService.commandes) ;
  filtrage: any;
  commandes: any[] = [];
  clients: any[] = [];
  ngOnInit(): void {
    this.getCommandes();
  }


  getCommandes(): any{
    this.gestionDesCommandesService.getClients()
      .subscribe(data => {
        this.clients = data;
        this.gestionDesCommandesService.getCommandes()
          .subscribe(data1 => {
            this.commandes = data1;
            this.commandes = this.commandes.filter(commande => commande.status);
            for (const commande of this.commandes) {
              commande.nom = this.getClient(commande.id_client);
            }
            // @ts-ignore
            this.dataSource = new MatTableDataSource(this.commandes) ;
            this.dataSource.paginator = this.paginator;
          }, error => {alert('une error s\'est produite'); });
      });

  }
  appliquerfilter(filtervalue: string): any{
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
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

