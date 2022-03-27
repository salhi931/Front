import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {GestionDePaiementService} from "../../services/gestion-de-paiement.service";
import {ConfigurationService} from "../../services/configuration.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  paiementList: any = [];

  constructor(public gestionDesCommandesService: GestionDePaiementService, public gestionDePaiementService: GestionDePaiementService,
              private router: Router, private route: ActivatedRoute, public configurationService: ConfigurationService) {
  }

  displayedColumns: string[] = ['N.o', 'client', 'total_paye', 'date_paiement', 'consultation', 'suppression'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource([]);
  filtrage: any;

  ngOnInit(): void {
    this.gestionDesCommandesService.getClients();
    this.getPaiment();
  }

  getPaiment(): any {
  this.gestionDesCommandesService.getClients();
  this.gestionDePaiementService.getPaiment()
      .subscribe(data => {
        this.paiementList = data;
        for (const paiement of this.paiementList) {
          paiement.client = this.getClient( paiement.idClient);
        }
        this.dataSource = new MatTableDataSource(this.paiementList);
        setTimeout(
          () => {
        this.dataSource.paginator = this.paginator; }, 10);
      }, error => {
        alert(error.message);
      });
  }

  appliquerfilter(filtervalue: string): any {
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
  }

  getClient(id: any): any{
   // /* this.gestionDesCommandesService.getClients();
    for ( const client of this.gestionDesCommandesService.clients){
      if ( client.idClient === id){
        return client.nom_client;
      }
    }
  }
  onSupprimer(id: number): any{
    this.gestionDePaiementService.supprimerpaiement(id);
  }

  onConsulter(id: any): any {
    this.gestionDePaiementService.getPaiementAndDetail(id)
      .subscribe(data => {
        this.gestionDePaiementService.paiement_consultee = data;
        this.gestionDePaiementService.getCommerciaux()
          .subscribe(data2 => {
            this.gestionDePaiementService.commerciaux = data2;
            this.gestionDePaiementService.
              getclientandcommercialofpaiement(this.gestionDePaiementService.paiement_consultee.idClient,
              this.gestionDePaiementService.paiement_consultee.id_commercial);
            this.router.navigate(['/consultation-paiement'], {relativeTo: this.route});
          });
        // tslint:disable-next-line:max-line-length
      });

  }
}
