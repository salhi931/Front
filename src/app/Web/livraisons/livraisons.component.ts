import {Component, OnInit, ViewChild} from '@angular/core';
import {GestionDesFacturesService} from "../../services/Gestion-des-factures.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigurationService} from "../../services/configuration.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-livraisons',
  templateUrl: './livraisons.component.html',
  styleUrls: ['./livraisons.component.css']
})
export class LivraisonsComponent implements OnInit {
  constructor(public gestionDesFacturesService: GestionDesFacturesService, private router: Router, private route: ActivatedRoute, public configurationService: ConfigurationService) { }
  displayedColumns: string[] = ['N.o', 'num_commande', 'nom_client', 'total_ttc', 'edit', 'suppression'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource([]) ;
  filtrage: any;
  factures: any[] = [];
  clients: any[] = [];
  ngOnInit(): void {
    this.configurationService.getConfiguration();
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
            setTimeout(
              () => {
                this.dataSource.paginator = this.paginator; }, 10);
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

  onModifier(id: any): any{
    this.gestionDesFacturesService.getCommericaux();
    this.gestionDesFacturesService.getClients();
    this.gestionDesFacturesService.modifier(id);
    this.gestionDesFacturesService.getFactureConsultee(id);
  }

  // tslint:disable-next-line:variable-name
  onSupprimer(id: number): any{
    this.gestionDesFacturesService.supprimer(id);

  }
  getcolor(i: number): any{
    if (i % 2 === 0){
      return '#DCDCDC';
    }
    else {
      return '#F5F5F5';
    }
  }
}
