
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {GestionDesCommandesService}from '../../../services/gestion-des-commandes.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {GestionDesCommandes2Service} from '../../../services/gestion-des-commandes-2.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GestionDesFacturesService} from "../../../services/Gestion-des-factures.service";
import {ConfigurationService} from "../../../services/configuration.service";

@Component({
  selector: 'app-dialog-retour',
  templateUrl: './dialog-retour.component.html',
  styleUrls: ['./dialog-retour.component.css']
})

export class DialogRetourComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public gestionDesFacturesService: GestionDesFacturesService, public configurationService: ConfigurationService
  ) { }
  displayedColumns: string[] = ['N.o', 'num_commande', 'nom_client', 'total_ttc', 'edit'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource(this.gestionDesFacturesService.factures) ;
  filtrage: any;
  factures: any[] = [];
  clients: any[] = [];
  ngOnInit(): void {
    this.getFactures();
  }
  getFactures(): any{
    this.gestionDesFacturesService.getClients2()
      .subscribe(data => {
        this.clients = data;
        this.gestionDesFacturesService.getFactures()
          .subscribe(data2 => {
            this.factures = data2;
            for (const facture of this.factures){
              facture.nom_client = this.getclient(facture.id_client);
            }
            // @ts-ignore
            this.dataSource = new MatTableDataSource(this.factures) ;
            this.dataSource.paginator = this.paginator;
          }, error => {alert('une error s\'est produite'); });
      });

  }
  getclient(id: number): any{
    for ( const client of this.clients){
      if ( client.idClient === id){
        return client.nom_client;
      }
    }
  }
  appliquerfilter(filtervalue: string): any{
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
  }

}


