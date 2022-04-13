import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {PieceJOintfactureComponent} from "../../factures/piece-jointfacture/piece-jointfacture.component";
import {ConfigurationService} from "../../../services/configuration.service";
import {GestionDesRetoursService} from "../../../services/gestion-des-retours.service";

@Component({
  selector: 'app-dialog-consultation-retour',
  templateUrl: './dialog-consultation-retour.component.html',
  styleUrls: ['./dialog-consultation-retour.component.css']
})
export class DialogConsultationRetourComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public configurationService: ConfigurationService,
              public gestionDesRetoursService: GestionDesRetoursService) { }

  ngOnInit(): void {
  }
  ConsulterFichierJointe(): any{
   this.gestionDesRetoursService.getImage(this.data.retour.numRetour)
      .subscribe(
        res => {
          this.dialog.open(PieceJOintfactureComponent, {data: res, height: '700px',
            width: '700px'});
        }
      );

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
