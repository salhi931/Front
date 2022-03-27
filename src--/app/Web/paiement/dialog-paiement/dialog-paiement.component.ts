import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {GestionDePaiementService} from "../../../services/gestion-de-paiement.service";

@Component({
  selector: 'app-dialog-paiement',
  templateUrl: './dialog-paiement.component.html',
  styleUrls: ['./dialog-paiement.component.css']
})
export class DialogPaiementComponent implements OnInit {
  cheques = false;
  especes = true;
  effets = false;
  tpes = false;
  virements = false;
  montantPayeespece = 0;
  montantPayecheque = 0;
  numCheque: any;
  banquenumCheque: any;
  dateCheque: any;
  porteur_du_cheque: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public gestionDePaiementService: GestionDePaiementService) { }

  ngOnInit(): void {
  }
  Ajoutercheque(fCheque: NgForm): any{
    this.gestionDePaiementService.Ajoutercheque(fCheque);
    this.gestionDePaiementService.calculerTotal();

  }
  AjouterEffet(fEffet: NgForm): any{
    this.gestionDePaiementService.AjouterEffet(fEffet);
    this.gestionDePaiementService.calculerTotal();

  }
  AjouterEspece(fEspece: NgForm): any{
    this.gestionDePaiementService.AjouterEspece(fEspece);
    this.gestionDePaiementService.calculerTotal();

  }
  AjouterVirement(fVirement: NgForm): any{
    this.gestionDePaiementService.AjouterVirement(fVirement);
    this.gestionDePaiementService.calculerTotal();

  }
  AjouterTpe(fTpe: NgForm): any{
    this.gestionDePaiementService.AjouterTpe(fTpe);
    this.gestionDePaiementService.calculerTotal();

  }

  cheque(): any {
    this.cheques = true;
    this.especes = false;
    this.effets = false;
    this.tpes = false;
    this.virements = false;
  }

  espece(): any {
    this.cheques = false;
    this.especes = true;
    this.effets = false;
    this.tpes = false;
    this.virements = false;
  }

  effet(): any {
    this.cheques = false;
    this.especes = false;
    this.effets = true;
    this.tpes = false;
    this.virements = false;
  }

  tpe(): any {
    this.cheques = false;
    this.especes = false;
    this.effets = false;
    this.tpes = true;
    this.virements = false;
  }

  virement(): any {
    this.cheques = false;
    this.especes = false;
    this.effets = false;
    this.tpes = false;
    this.virements = true;
  }

}
