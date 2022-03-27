import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {GestionDesFacturesService} from "../../../services/Gestion-des-factures.service";
import {PieceJOintfactureComponent} from "../piece-jointfacture/piece-jointfacture.component";
import {ConfigurationService} from "../../../services/configuration.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {DialogConsultationPaiementComponent} from "../../paiement/dialog-consultation-paiement/dialog-consultation-paiement.component";
import {GestionDePaiementService} from "../../../services/gestion-de-paiement.service";

@Component({
  selector: 'app-dialog-consultation',
  templateUrl: './dialog-consultation.component.html',
  styleUrls: ['./dialog-consultation.component.css']
})
export class DialogConsultationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public gestionDePaiementService: GestionDePaiementService, public gestionDesFacturesService: GestionDesFacturesService, public configurationService: ConfigurationService) { }
  displayedColumns: string[] = ['N.o', 'commercial', 'total_paye', 'date_paiement', 'consultation'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource([]);
  filtrage: any;
  paiementList: any = [];
  Total: any = 0;
  ngOnInit(): void {
  }
  ConsulterFichierJointe(): any{
    this.gestionDesFacturesService.getImage(this.data.facture.numFacture)
      .subscribe(
        res => {
          // this.gestionDesFacturesService.selectedFileListConsulte = res;
          this.dialog.open(PieceJOintfactureComponent, {data: res, height: '700px',
            width: '700px'});

          /*const base64Data = retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;*/
        }
      );

  }
  getPaiements(numfacture: any): any {
    this.gestionDesFacturesService.getPaiementLiee(numfacture)
          .subscribe(data => {
            this.paiementList = data;
            console.log(this.paiementList);
             // @ts-ignore
             for (const paiement of this.paiementList) {
              const client = this.gestionDesFacturesService.rechercheClientPaiement(paiement.idClient) ;
              console.log(client);
              if (client !== undefined){
                paiement.nomClient = client.nom_client;
                paiement.codeClient = client.code;
              }

              paiement.nomCommercial = this.gestionDesFacturesService.getNomCommercialPaiement( paiement.idCommercial);
            }
            this.dataSource.data = this.paiementList;

            setTimeout(
              () => {
                this.dataSource.paginator = this.paginator; }, 10);
          }, error => {
            alert(error.message);
          });

  }

  onConsulter(id: any): any {
    this.gestionDePaiementService.consulterPaiementWeb(id)
      .subscribe(data1 => {
        console.log(this.gestionDePaiementService.clients);
        // @ts-ignore
        const client = this.gestionDesFacturesService.clients.filter( cl => cl.idClient === data1.paiemententetee.idClient)[0];
        if ( client !== undefined) {
          data1.paiemententetee.nomClient = client.nom_client;
          data1.paiemententetee.codeClient = client.code;
        }
        // @ts-ignore
        data1.paiemententetee.nomCommercial = this.gestionDesFacturesService.commerciaux.filter(commercial => commercial.id_commercial === data1.paiemententetee.idCommercial)[0].nom;
        this.dialog.open(DialogConsultationPaiementComponent, {data: data1, height: '800px',
          width: '1500px'});
      });
    // this.gestionDePaiementService.consulterPaiement(id);

  }
  TransfertForm(num: any): any{
    if (num.length > 0){
      const n = num.length;
      const newNum1 = num;
      const milSeconde  = newNum1.slice(-2);
      const soconde  = newNum1.slice(-4, -2);
      const min  = newNum1.slice(-6, -4);
      const heure  = newNum1.slice(-8, -6);
      const jours = newNum1.slice(-10, -8);
      const mois = newNum1.slice(-12, -10);
      const annee = newNum1.slice(-16, -12);
      return heure + ':' +  min + ':' + soconde;
     }
    return '';
  }

}
