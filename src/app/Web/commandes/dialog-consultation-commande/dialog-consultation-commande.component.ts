import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {GestionDesFacturesService} from "../../../services/Gestion-des-factures.service";
import {ConfigurationService} from "../../../services/configuration.service";
import {GestionDesCommandesService} from "../../../services/gestion-des-commandes.service";
import {PieceJOintfactureComponent} from "../../factures/piece-jointfacture/piece-jointfacture.component";

@Component({
  selector: 'app-dialog-consultation-commande',
  templateUrl: './dialog-consultation-commande.component.html',
  styleUrls: ['./dialog-consultation-commande.component.css']
})
export class DialogConsultationCommandeComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public gestionDesCommandesService: GestionDesCommandesService, public configurationService: ConfigurationService) { }

  ngOnInit(): void {
  }
  ConsulterFichierJointe(): any{
    this.gestionDesCommandesService.getImage(this.data.commande.numCommande)
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
