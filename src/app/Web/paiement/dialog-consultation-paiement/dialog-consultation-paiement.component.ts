import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {GestionDePaiementService} from "../../../services/gestion-de-paiement.service";
import {ConfigurationService} from "../../../services/configuration.service";
import {PieceJOintfactureComponent} from "../../factures/piece-jointfacture/piece-jointfacture.component";

@Component({
  selector: 'app-dialog-consultation-paiement',
  templateUrl: './dialog-consultation-paiement.component.html',
  styleUrls: ['./dialog-consultation-paiement.component.css']
})
export class DialogConsultationPaiementComponent implements OnInit {

  constructor(public configurationService: ConfigurationService, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public gestionDePaiementService: GestionDePaiementService) { }

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

          /*const base64Data = retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;*/
        }
      );

  }

}
