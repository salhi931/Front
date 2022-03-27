import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {GestionDePaiementService} from "../../services/gestion-de-paiement.service";
import {ConfigurationService} from "../../services/configuration.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Form} from "@angular/forms";
import {DialogConsultationComponent} from "../factures/dialog-consultation/dialog-consultation.component";
import {DialogConsultationPaiementComponent} from "./dialog-consultation-paiement/dialog-consultation-paiement.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  paiementList: any = [];
  Total: any = 0;
  constructor(public dialog: MatDialog, public gestionDesCommandesService: GestionDePaiementService, public gestionDePaiementService: GestionDePaiementService,
              private router: Router, private route: ActivatedRoute, public configurationService: ConfigurationService) {
  }

  displayedColumns: string[] = ['N.o', 'code', 'client', 'commercial', 'total_paye', 'date_paiement', 'consultation', 'suppression'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource([]);
  filtrage: any;

  ngOnInit(): void {
    this.gestionDesCommandesService.getClients();
    this.configurationService.getConfiguration();
    this.getPaiment();
  }

  getPaiment(): any {
  this.gestionDesCommandesService.getCommerciaux()
    .subscribe(dataCommer => {
      this.gestionDePaiementService.commerciaux = dataCommer;
      this.gestionDesCommandesService.getClientsOp()
        .subscribe(dataC => {
          this.gestionDePaiementService.clients = dataC;
          this.gestionDePaiementService.getPaiment()
            .subscribe(data => {
              this.paiementList = data;
              this.Total = 0;
              // @ts-ignore
              this.paiementList.forEach(current  => this.Total += current.totalPaye) ;
              for (const paiement of this.paiementList) {
                paiement.nomClient = this.getNomClient( paiement.idClient);
                paiement.codeClient = this.getCodeClient( paiement.idClient);
                paiement.nomCommercial = this.getNomCommercial( paiement.idCommercial);
              }
              this.dataSource = new MatTableDataSource(this.paiementList);
              setTimeout(
                () => {
                  this.dataSource.paginator = this.paginator; }, 10);
            }, error => {
              alert(error.message);
            });
        });
    });


  }
  getFacturesCommercialDate(f: Form): any{
    // @ts-ignore
    this.gestionDePaiementService.getPaiementCommercialDate(f)
      .subscribe(data2 => {
        this.paiementList = data2;
        this.Total = 0;
        // @ts-ignore
        this.paiementList.forEach(current  => this.Total += current.totalPaye) ;
        for (const paiemnt of this.paiementList){
          paiemnt.nomClient = this.getNomClient( paiemnt.idClient);
          paiemnt.codeClient = this.getCodeClient( paiemnt.idClient);
          paiemnt.nomCommercial = this.getNomCommercial( paiemnt.idCommercial);
        }
        // @ts-ignore
        this.dataSource.data = this.paiementList;
        setTimeout(
          () => {
            this.dataSource.paginator = this.paginator; }, 10);
      }, error => {alert('une error s\'est produite');
      });
  }

  appliquerfilter(filtervalue: string): any {
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
    this.Total = 0;
    // @ts-ignore
    this.dataSource.filteredData.forEach(current  => this.Total += current.totalPaye) ;
  }

  getNomClient(id: any): any{
   // /* this.gestionDesCommandesService.getClients();
    for ( const client of this.gestionDesCommandesService.clients){
      if ( client.idClient === id){
        return client.nom_client;
      }
    }
  }
  getCodeClient(id: any): any{
   // /* this.gestionDesCommandesService.getClients();
    for ( const client of this.gestionDesCommandesService.clients){
      if ( client.idClient === id){
        return client.code;
      }
    }
  }
  getNomCommercial(id: any): any{
   // /* this.gestionDesCommandesService.getClients();
    for ( const commer of this.gestionDesCommandesService.commerciaux){
      if ( commer.id_commercial === id){
        return commer.nom;
      }
    }
  }
  onSupprimer(id: number): any{
    this.gestionDePaiementService.supprimerpaiement(id);
  }

  onConsulter(id: any): any {
    this.gestionDePaiementService.consulterPaiementWeb(id)
      .subscribe(data1 => {
        console.log(this.gestionDePaiementService.clients);
        // @ts-ignore
        const client = this.gestionDePaiementService.clients.filter( cl => cl.idClient === data1.paiemententetee.idClient)[0];
        if ( client !== undefined) {
          data1.paiemententetee.nomClient = client.nom_client;
          data1.paiemententetee.codeClient = client.code;
        }
        // @ts-ignore
        data1.paiemententetee.nomCommercial = this.gestionDePaiementService.commerciaux.filter(commercial => commercial.id_commercial === data1.paiemententetee.idCommercial)[0].nom;
        this.dialog.open(DialogConsultationPaiementComponent, {data: data1, height: '900px',
          width: '1700px'});
      });
    // this.gestionDePaiementService.consulterPaiement(id);

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
