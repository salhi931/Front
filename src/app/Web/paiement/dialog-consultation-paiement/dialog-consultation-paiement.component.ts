import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {GestionDePaiementService} from '../../../services/gestion-de-paiement.service';
import {ConfigurationService} from '../../../services/configuration.service';
import {PieceJOintfactureComponent} from '../../factures/piece-jointfacture/piece-jointfacture.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {DialogConsultationComponent} from "../../factures/dialog-consultation/dialog-consultation.component";
import {GestionDesFacturesService} from "../../../services/Gestion-des-factures.service";

@Component({
  selector: 'app-dialog-consultation-paiement',
  templateUrl: './dialog-consultation-paiement.component.html',
  styleUrls: ['./dialog-consultation-paiement.component.css']
})
export class DialogConsultationPaiementComponent implements OnInit {
  factures: any = [];
  displayedColumns: string[] = ['code', 'nom_client', 'total_ttc', 'Montant', 'MontantTotal' , 'Date', 'DateEcheance',   'edit', 'suppression'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource([]);
  filtrage: any;
  constructor(public gestionDesFacturesService: GestionDesFacturesService , public configurationService: ConfigurationService, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public gestionDePaiementService: GestionDePaiementService) { }

  ngOnInit(): void {
    console.log(this.data);
  }
  ConsulterFichierJointe(): any{
    this.gestionDePaiementService.getImage(this.data.paiemententetee.numPaiement)
      .subscribe(
        res => {
          // this.gestionDesFacturesService.selectedFileListConsulte = res;
          this.dialog.open(PieceJOintfactureComponent, {data: res, height: '700px',
            width: '700px'});
        }
      );
  }
  getFactures(numPaiement: any): any {
     this.gestionDePaiementService.getFacturesLies(numPaiement)
      .subscribe(data => {
        this.factures = data;
        console.log(this.factures);
        // @ts-ignore
        for (const facture of this.factures) {
          facture.paye = undefined;
          facture.montantPayePaiement = this.data.paiementFactureList
            // @ts-ignore
            .filter(faturePaiement => faturePaiement.idFacture = facture.numFacture)[0].montant;
          if ( facture.montantPaye >= facture.totalTTC){
            facture.paye = 1;
          }
          if ( facture.montantPaye === 0 ){
            facture.paye = 0;
          }
          const client =  this.gestionDePaiementService.rechercheClientPaiement(facture.idClient) ;
          console.log(client);
          if (client !== undefined){
            facture.nomClient = client.nom_client;
            facture.codeClient = client.code;
          }
        }
        this.dataSource.data = this.factures;
        console.log(this.factures);
        setTimeout(
          () => {
            this.dataSource.paginator = this.paginator; }, 10);
      }, error => {
        alert(error.message);
      });
  }
  onModifier(id: any): any{
    let facture: any;
    // tslint:disable-next-line:variable-name
    let facture_detail = [];
    this.gestionDesFacturesService.getFactureWeb(id)
      .subscribe(data => {
        // @ts-ignore
        facture = data.factureentete;
        // @ts-ignore
        facture_detail = data.facturedetail;
        for (const facturedetails of facture_detail){
          facturedetails.code_article = this.gestionDesFacturesService.getCodeArticle(facturedetails.id_article);
          facturedetails.description = this.gestionDesFacturesService.getDescriptionArticle(facturedetails.id_article);
          facturedetails.magasin = this.gestionDesFacturesService.getMagasinNom(facturedetails.id_magasin);
        }
        // @ts-ignore
        // tslint:disable-next-line:no-shadowed-variable
        const clientCherche = this.gestionDePaiementService.clients.filter(client => client.idClient === facture.idClient)[0];
        facture.code = clientCherche.code;
        facture.nomClient = clientCherche.nom_client;
        facture.nomCommercial = this.gestionDePaiementService.commerciaux
          // @ts-ignore
          .filter(commercial => commercial.id_commercial === facture.idCommercial)[0].nom;
        console.log(facture);
        this.dialog.open(DialogConsultationComponent, {data: {facture: facture, facture_details: facture_detail}, height: '1000px',
          width: '1500px'});
      }, error => {alert('une error s\'est produite'); });
  }
}
